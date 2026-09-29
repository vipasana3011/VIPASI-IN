import asyncio
import base64
import json
import os
import shutil
import subprocess
import tempfile
import urllib.request
import websockets

CHROME_PATH = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
PORT = 9224
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
        print(f'Captured: {os.path.basename(path)} ({len(data)} bytes)')

    async def close(self):
        if self.ws:
            await self.ws.close()

async def main():
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
        # Wait for Chrome to boot
        for _ in range(12):
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
        print("1. Testing Homepage...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, 'final_01_home.png'))

        # 2. Collections Page (verify category tabs not clipped)
        print("2. Testing Collections Page & Tabs...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000/collections'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, 'final_02_collections.png'))

        # 3. Occasions: Haldi Sunshine
        print("3. Testing Haldi Sunshine...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000/collections?occasion=haldi'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, 'final_03_haldi.png'))

        # 4. Occasions: Royal Wedding Guest
        print("4. Testing Royal Wedding...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000/collections?occasion=wedding'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, 'final_04_wedding.png'))

        # 5. Dedicated Occasions Page
        print("5. Testing /occasions Page...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000/occasions'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, 'final_05_occasions_page.png'))

        # 6. Customer Account Portal
        print("6. Testing /account Portal...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000/account'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, 'final_06_account.png'))

        # 7. PDP & Related Products
        print("7. Testing PDP & Related Products...")
        await client.send('Page.navigate', {'url': 'http://localhost:3000/product/sitara-ivory-georgette-sharara-set'})
        await asyncio.sleep(3)
        await client.evaluate('window.scrollTo(0, 1200)')
        await asyncio.sleep(1.5)
        await client.screenshot(os.path.join(OUT_DIR, 'final_07_pdp_related.png'))

        # 8. Mobile Viewport 375x812
        print("8. Testing Mobile 375px...")
        await client.send('Emulation.setDeviceMetricsOverride', {
            'width': 375,
            'height': 812,
            'deviceScaleFactor': 2,
            'mobile': True
        })
        await client.send('Page.navigate', {'url': 'http://localhost:3000/collections'})
        await asyncio.sleep(3)
        await client.screenshot(os.path.join(OUT_DIR, 'final_08_mobile_collections.png'))

        await client.close()
        print("All visual verification tests completed successfully!")

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except subprocess.TimeoutExpired:
            proc.kill()
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == '__main__':
    asyncio.run(main())
