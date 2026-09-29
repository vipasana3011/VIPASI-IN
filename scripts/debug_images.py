import asyncio
import json
import os
import shutil
import subprocess
import tempfile
import urllib.request
import websockets

CHROME_PATH = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
PORT = 9228

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
        ws = await websockets.connect(page_tab['webSocketDebuggerUrl'], max_size=30*1024*1024)

        msg_id = 0
        async def call(method, params=None):
            nonlocal msg_id
            msg_id += 1
            await ws.send(json.dumps({'id': msg_id, 'method': method, 'params': params or {}}))
            while True:
                r = json.loads(await ws.recv())
                if r.get('id') == msg_id: return r.get('result', {})

        await call('Page.enable')
        await call('Network.enable')
        
        # Test loading one image in page context
        test_script = '''
            new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve({ status: 'loaded', w: img.width, h: img.height });
                img.onerror = (e) => resolve({ status: 'error', error: e.type });
                img.src = "https://lh3.googleusercontent.com/d/1ma6qPM0kHrBg1sNFGADOlVLh95o4vCGc=s1200";
            })
        '''
        res = await call('Runtime.evaluate', {
            'expression': test_script,
            'awaitPromise': True,
            'returnByValue': True
        })
        print('Image load test from page:', res)

        # Also test with referrerpolicy="no-referrer"
        test_script2 = '''
            new Promise((resolve) => {
                const img = new Image();
                img.referrerPolicy = "no-referrer";
                img.onload = () => resolve({ status: 'loaded with no-referrer', w: img.width, h: img.height });
                img.onerror = (e) => resolve({ status: 'error', error: e.type });
                img.src = "https://lh3.googleusercontent.com/d/1ma6qPM0kHrBg1sNFGADOlVLh95o4vCGc=s1200";
            })
        '''
        res2 = await call('Runtime.evaluate', {
            'expression': test_script2,
            'awaitPromise': True,
            'returnByValue': True
        })
        print('Image load test with no-referrer:', res2)

        # Also test alternative Google Drive direct link format
        test_script3 = '''
            new Promise((resolve) => {
                const img = new Image();
                img.referrerPolicy = "no-referrer";
                img.onload = () => resolve({ status: 'loaded with drive direct link', w: img.width, h: img.height });
                img.onerror = (e) => resolve({ status: 'error', error: e.type });
                img.src = "https://drive.google.com/thumbnail?id=1ma6qPM0kHrBg1sNFGADOlVLh95o4vCGc&sz=w1200";
            })
        '''
        res3 = await call('Runtime.evaluate', {
            'expression': test_script3,
            'awaitPromise': True,
            'returnByValue': True
        })
        print('Image load test drive thumbnail:', res3)

        await ws.close()
    finally:
        proc.terminate()
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == '__main__':
    asyncio.run(main())
