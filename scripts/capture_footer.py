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
PORT = 9223
OUT_DIR = r'c:\PROJECT\Vipasi-in\public\screenshots'
os.makedirs(OUT_DIR, exist_ok=True)

class CDPClient:
    def __init__(self, ws_url):
        self.ws_url = ws_url
        self.msg_id = 0
        self.ws = None

    async def connect(self):
        self.ws = await websockets.connect(self.ws_url, max_size=30*1024*1024)

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

        await cdp.send('Page.enable')
        await cdp.send('DOM.enable')
        await cdp.send('Page.navigate', {'url': 'http://localhost:3000'})

        print('Waiting for page load (4s)...')
        await asyncio.sleep(4)

        # Helper function for scrolling to footer
        async def scroll_to_footer(delay=2.0):
            await cdp.evaluate("""
                document.documentElement.style.scrollBehavior = 'auto';
                document.body.style.scrollBehavior = 'auto';
                const footer = document.getElementById('karigar-footer');
                if (footer) {
                    footer.scrollIntoView(true);
                }
                window.scrollTo(0, 99999999);
            """)
            await asyncio.sleep(delay)

        # 1. Capture 1280px Desktop Footer Scene
        print('1. Capturing 1280px Desktop Footer Scene...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 1280,
            'height': 950,
            'deviceScaleFactor': 1,
            'mobile': False
        })
        await scroll_to_footer(2.0)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_1280_scene.png'))

        # Capture Newsletter + Links on 1280px
        print('Capturing 1280px Newsletter & Links...')
        await cdp.evaluate("""
            const footer = document.getElementById('karigar-footer');
            if (footer) {
                const rect = footer.getBoundingClientRect();
                window.scrollTo(0, window.pageYOffset + rect.top);
            }
        """)
        await asyncio.sleep(1.5)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_1280_newsletter_links.png'))

        # 2. Capture 1920px Desktop Footer Scene
        print('2. Capturing 1920px Wide Footer Scene...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 1920,
            'height': 1080,
            'deviceScaleFactor': 1,
            'mobile': False
        })
        await scroll_to_footer(2.0)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_1920_scene.png'))

        # 3. Capture 768px Tablet Footer Scene
        print('3. Capturing 768px Tablet Footer Scene...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 768,
            'height': 1024,
            'deviceScaleFactor': 1,
            'mobile': False
        })
        await scroll_to_footer(2.5)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_768_scene.png'))

        # 4. Capture 360px Mobile Footer Scene (vertical portrait)
        print('4. Capturing 360px Mobile Footer Scene...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 360,
            'height': 800,
            'deviceScaleFactor': 2,
            'mobile': True
        })
        await scroll_to_footer(3.0)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_360_scene.png'))

        # 5. Hotspot Open Interaction (clicking or hovering over an active hotspot)
        print('5. Capturing Hotspot Card Open...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 1280,
            'height': 950,
            'deviceScaleFactor': 1,
            'mobile': False
        })
        await scroll_to_footer(1.5)
        await cdp.evaluate("""
            const btns = Array.from(document.querySelectorAll('button')).filter(b => b.getAttribute('aria-label') && b.getAttribute('aria-label').includes('Craft detail'));
            if (btns.length > 3) {
                btns[3].click();
            }
        """)
        await asyncio.sleep(1.5)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_hotspot_active.png'))

        await cdp.close()
        print('All footer screenshots captured successfully!')

    finally:
        proc.terminate()
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == '__main__':
    asyncio.run(main())
