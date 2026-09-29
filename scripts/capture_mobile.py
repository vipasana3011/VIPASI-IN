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

async def main():
    temp_dir = tempfile.mkdtemp()
    proc = subprocess.Popen([
        CHROME_PATH,
        '--headless=new',
        '--disable-gpu',
        f'--user-data-dir={temp_dir}',
        f'--remote-debugging-port={PORT}',
        '--window-size=390,844',
        'about:blank'
    ])

    try:
        await asyncio.sleep(2)
        req = urllib.request.urlopen(f'http://localhost:{PORT}/json')
        tabs = json.loads(req.read().decode())
        page_tab = [t for t in tabs if t.get('type') == 'page'][0]
        ws = await websockets.connect(page_tab['webSocketDebuggerUrl'], max_size=30*1024*1024)

        msg_id = 0
        async def call(method, params=None):
            nonlocal msg_id
            msg_id += 1
            await ws.send(json.dumps({'id': msg_id, 'method': method, 'params': params or {}}))
            while True:
                r = json.loads(await ws.recv())
                if r.get('id') == msg_id:
                    return r.get('result', {})

        await call('Page.enable')
        await call('Page.navigate', {'url': 'http://localhost:3000'})
        await asyncio.sleep(4)

        # Scroll right to footer
        await call('Runtime.evaluate', {
            'expression': '''(() => {
                document.documentElement.style.scrollBehavior = 'auto';
                document.body.style.scrollBehavior = 'auto';
                const footer = document.getElementById('karigar-footer');
                if (footer) footer.scrollIntoView(true);
                window.scrollTo(0, document.body.scrollHeight);
            })()''',
            'awaitPromise': True
        })
        await asyncio.sleep(2)

        res = await call('Page.captureScreenshot', {'format': 'png'})
        data = base64.b64decode(res['data'])
        with open(os.path.join(OUT_DIR, 'footer_360_scene.png'), 'wb') as f:
            f.write(data)
        print('Captured mobile footer cleanly, size:', len(data))

        await ws.close()
    finally:
        proc.terminate()
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == '__main__':
    asyncio.run(main())
