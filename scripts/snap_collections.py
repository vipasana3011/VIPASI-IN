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
PORT = 9225
OUT_PATH = r'c:\PROJECT\Vipasi-in\public\screenshots\collections_toolbar_updated.png'

async def snap():
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
        for _ in range(10):
            try:
                with urllib.request.urlopen(f'http://localhost:{PORT}/json') as r:
                    tabs = json.loads(r.read())
                    if tabs:
                        ws_url = tabs[0]['webSocketDebuggerUrl']
                        break
            except Exception:
                await asyncio.sleep(0.5)

        ws = await websockets.connect(ws_url, max_size=25*1024*1024)
        msg_id = 1
        
        async def send(method, params=None):
            nonlocal msg_id
            msg_id += 1
            await ws.send(json.dumps({'id': msg_id, 'method': method, 'params': params or {}}))
            while True:
                resp = json.loads(await ws.recv())
                if resp.get('id') == msg_id:
                    return resp.get('result', {})

        await send('Page.enable')
        await send('Page.navigate', {'url': 'http://localhost:3000/collections'})
        await asyncio.sleep(3)

        res = await send('Page.captureScreenshot', {'format': 'png'})
        data = base64.b64decode(res['data'])
        with open(OUT_PATH, 'wb') as f:
            f.write(data)
        print(f"Captured toolbar: {OUT_PATH} ({len(data)} bytes)")
        await ws.close()

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == '__main__':
    asyncio.run(snap())
