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
PORT = 9222
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

    async def screenshot(self, path, clip=None):
        params = {'format': 'png'}
        if clip:
            params['clip'] = clip
        res = await self.send('Page.captureScreenshot', params)
        data = base64.b64decode(res['data'])
        with open(path, 'wb') as f:
            f.write(data)
        print(f'Saved: {path} (size: {len(data)} bytes)')

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
        await asyncio.sleep(2)
        req = urllib.request.urlopen(f'http://localhost:{PORT}/json')
        tabs = json.loads(req.read().decode())
        page_tab = [t for t in tabs if t.get('type') == 'page'][0]
        cdp = CDPClient(page_tab['webSocketDebuggerUrl'])
        await cdp.connect()

        # Enable Page domain and navigate to localhost:3000
        await cdp.send('Page.enable')
        await cdp.send('DOM.enable')
        await cdp.send('Page.navigate', {'url': 'http://localhost:3000'})

        print('Waiting for page load and hydration (5s)...')
        await asyncio.sleep(5)

        # 1. Capture 1280px Navbar (Closed)
        print('Capturing 1280px Navbar Closed...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 1280,
            'height': 900,
            'deviceScaleFactor': 1,
            'mobile': False
        })
        await cdp.evaluate('window.scrollTo(0, 0)')
        await asyncio.sleep(1)
        await cdp.screenshot(os.path.join(OUT_DIR, 'nav_1280_closed.png'))

        # 2. Trigger Mega Menu Open on 1280px
        print('Opening Mega Menu on 1280px...')
        await cdp.evaluate("""
            const links = Array.from(document.querySelectorAll('nav a, nav div'));
            const shopItem = links.find(el => el.textContent.trim().startsWith('SHOP'));
            if (shopItem) {
                shopItem.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            }
        """)
        await asyncio.sleep(1.2)
        await cdp.screenshot(os.path.join(OUT_DIR, 'nav_1280_megamenu.png'))

        # 3. Scroll to Karigar's World Footer on 1280px
        print('Scrolling to Footer on 1280px...')
        await cdp.evaluate("""
            const footer = document.getElementById('karigar-footer');
            if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
            else window.scrollTo(0, document.body.scrollHeight);
        """)
        await asyncio.sleep(2.0)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_1280_scene.png'))

        # 4. Capture 1920px Desktop View
        print('Capturing 1920px Viewport...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 1920,
            'height': 1080,
            'deviceScaleFactor': 1,
            'mobile': False
        })
        await cdp.evaluate('window.scrollTo(0, 0)')
        await asyncio.sleep(1)
        await cdp.screenshot(os.path.join(OUT_DIR, 'nav_1920_closed.png'))

        await cdp.evaluate("""
            const footer = document.getElementById('karigar-footer');
            if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
        """)
        await asyncio.sleep(2.0)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_1920_scene.png'))

        # 5. Capture 768px Tablet View
        print('Capturing 768px Viewport...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 768,
            'height': 1024,
            'deviceScaleFactor': 1,
            'mobile': False
        })
        await cdp.evaluate('window.scrollTo(0, 0)')
        await asyncio.sleep(1)
        await cdp.screenshot(os.path.join(OUT_DIR, 'nav_768.png'))

        await cdp.evaluate("""
            const footer = document.getElementById('karigar-footer');
            if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
        """)
        await asyncio.sleep(2.0)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_768_scene.png'))

        # 6. Capture 360px Mobile View
        print('Capturing 360px Mobile View...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 360,
            'height': 800,
            'deviceScaleFactor': 2,
            'mobile': True
        })
        await cdp.evaluate('window.scrollTo(0, 0)')
        await asyncio.sleep(1)
        await cdp.screenshot(os.path.join(OUT_DIR, 'nav_360_closed.png'))

        await cdp.evaluate("""
            const footer = document.getElementById('karigar-footer');
            if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
        """)
        await asyncio.sleep(2.0)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_360_scene.png'))

        await cdp.close()
        print('All screenshots captured successfully!')

    finally:
        proc.terminate()
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == '__main__':
    asyncio.run(main())
