import asyncio
import base64
import json
import os
import shutil
import subprocess
import tempfile
import time
import urllib.request
import websockets

CHROME_PATH = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
PORT = 9223
OUT_DIR = r'c:\PROJECT\Vipasi-in\public\screenshots'
os.makedirs(OUT_DIR, exist_ok=True)

class CDPClient:
    def __init__(self, ws_url):
        self.ws_url = ws_url
        self.msg_id = 0
        self.ws = None

    async def connect(self):
        self.ws = await websockets.connect(self.ws_url, max_size=25*1024*1024)

    async def send(self, method, params=None):
        self.msg_id += 1
        payload = {'id': self.msg_id, 'method': method, 'params': params or {}}
        await self.ws.send(json.dumps(payload))
        while True:
            resp = json.loads(await self.ws.recv())
            if resp.get('id') == self.msg_id:
                return resp.get('result', {})

    async def evaluate(self, expr):
        return await self.send('Runtime.evaluate', {'expression': expr, 'awaitPromise': True, 'returnByValue': True})

    async def screenshot(self, path):
        params = {'format': 'png'}
        res = await self.send('Page.captureScreenshot', params)
        data = base64.b64decode(res['data'])
        with open(path, 'wb') as f:
            f.write(data)
        print(f'Saved: {path} (size: {len(data)} bytes)')

    async def close(self):
        if self.ws:
            await self.ws.close()

async def run_captures():
    temp_dir = tempfile.mkdtemp()
    proc = subprocess.Popen([
        CHROME_PATH,
        '--headless=new',
        '--disable-gpu',
        f'--user-data-dir={temp_dir}',
        f'--remote-debugging-port={PORT}',
        '--window-size=1280,950',
        'about:blank'
    ])

    try:
        # Wait for Chrome to initialize
        for _ in range(10):
            try:
                with urllib.request.urlopen(f'http://localhost:{PORT}/json') as r:
                    tabs = json.loads(r.read())
                    if tabs:
                        ws_url = tabs[0]['webSocketDebuggerUrl']
                        break
            except Exception:
                await asyncio.sleep(0.5)

        client = CDPClient(ws_url)
        await client.connect()
        await client.send('Page.enable')
        await client.send('DOM.enable')

        # 1. Homepage Desktop View
        print("Capturing 1: Homepage Desktop...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, '01_homepage_desktop.png'))

        # Scroll down to featured products
        print("Capturing 2: Homepage Products...")
        await client.evaluate('window.scrollTo(0, 1100)')
        await asyncio.sleep(2)
        await client.screenshot(os.path.join(OUT_DIR, '02_homepage_products.png'))

        # Scroll down to footer scene
        print("Capturing 3: Footer Scene...")
        await client.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await asyncio.sleep(2)
        await client.screenshot(os.path.join(OUT_DIR, '03_footer_scene.png'))

        # 2. Collections Page
        print("Capturing 4: Collections Page...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000/collections'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, '04_collections_page.png'))

        # 3. Product Detail Page
        print("Capturing 5: Product Detail Page...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000/product/sitara-ivory-georgette-sharara-set'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, '05_pdp_page.png'))

        # 4. Mobile View
        print("Capturing 6: Mobile Header & Hero...")
        await client.send('Emulation.setDeviceMetricsOverride', {
            'width': 375,
            'height': 812,
            'deviceScaleFactor': 2,
            'mobile': True
        })
        await client.send('Page.navigate', {'url': 'http://localhost:3000'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, '06_mobile_home.png'))

        await client.close()
        print("All visual captures completed successfully!")

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except subprocess.TimeoutExpired:
            proc.kill()
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == '__main__':
    asyncio.run(run_captures())
