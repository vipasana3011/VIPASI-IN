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

    async def screenshot(self, path):
        res = await self.send('Page.captureScreenshot', {'format': 'png'})
        data = base64.b64decode(res['data'])
        with open(path, 'wb') as f:
            f.write(data)
        print(f'Saved: {path} ({len(data)} bytes)')

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
        '--window-size=1280,1000',
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
        print('Waiting for page load...')
        await asyncio.sleep(4)

        # 1. Capture Newsletter Strip & Link Area
        print('Scrolling to Newsletter & Links...')
        await cdp.evaluate("""
            const footer = document.getElementById('karigar-footer');
            footer.scrollIntoView({ behavior: 'instant', block: 'start' });
        """)
        await asyncio.sleep(1.5)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_top_links.png'))

        # 2. Scroll to Karigar's World living scene
        print('Scrolling to Living Scene...')
        await cdp.evaluate("""
            const footer = document.getElementById('karigar-footer');
            footer.scrollIntoView({ behavior: 'instant', block: 'end' });
        """)
        await asyncio.sleep(1.5)
        await cdp.screenshot(os.path.join(OUT_DIR, 'footer_living_scene_full.png'))

        # 3. Open Mega Menu (click SHOP trigger)
        print('Opening Mega Menu via click...')
        await cdp.evaluate('window.scrollTo(0, 0)')
        await asyncio.sleep(0.5)
        await cdp.evaluate("""
            const links = Array.from(document.querySelectorAll('nav a'));
            const shopLink = links.find(el => el.textContent.includes('SHOP'));
            if (shopLink) {
                shopLink.click();
                const parentDiv = shopLink.closest('div');
                if (parentDiv) {
                    parentDiv.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                    parentDiv.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                }
            }
        """)
        await asyncio.sleep(1.5)
        await cdp.screenshot(os.path.join(OUT_DIR, 'nav_megamenu_shop.png'))

        # 4. Open Search Overlay
        print('Opening Search Overlay...')
        await cdp.evaluate("""
            const searchButtons = Array.from(document.querySelectorAll('button'));
            const searchBtn = searchButtons.find(b => b.textContent.includes('Search') || b.querySelector('svg.lucide-search'));
            if (searchBtn) searchBtn.click();
        """)
        await asyncio.sleep(1.0)
        await cdp.evaluate("""
            const input = document.querySelector('input[placeholder*=\"Search\"]');
            if (input) {
                input.value = 'Chanderi';
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
        """)
        await asyncio.sleep(1.0)
        await cdp.screenshot(os.path.join(OUT_DIR, 'search_overlay_active.png'))

        # 5. Open Mobile Menu Drawer (on 360px)
        print('Opening Mobile Menu Drawer...')
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 360,
            'height': 800,
            'deviceScaleFactor': 2,
            'mobile': True
        })
        await cdp.evaluate('window.location.reload()')
        await asyncio.sleep(3.5)
        await cdp.evaluate("""
            const menuBtn = document.querySelector('button[aria-label=\"Open mobile menu\"]');
            if (menuBtn) menuBtn.click();
        """)
        await asyncio.sleep(1.0)
        await cdp.screenshot(os.path.join(OUT_DIR, 'mobile_drawer_open.png'))

        await cdp.close()
        print('All detail screenshots captured!')

    finally:
        proc.terminate()
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == '__main__':
    asyncio.run(main())
