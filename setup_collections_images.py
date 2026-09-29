import os
import urllib.request
from PIL import Image
import io

out_dir = r"c:\PROJECT\Vipasi-in\public\images\collections"
os.makedirs(out_dir, exist_ok=True)

sources = [
    ("collection-01.webp", "https://lh3.googleusercontent.com/d/1ma6qPM0kHrBg1sNFGADOlVLh95o4vCGc=s1600"),
    ("collection-02.webp", "https://lh3.googleusercontent.com/d/1WJ3HSDNCqDL8tsC6vP9YWkd83PV-v99G=s1600"),
    ("collection-03.webp", "https://lh3.googleusercontent.com/d/1WvuvV28wbNVjDWDkVIx_vjP27n7rRDtm=s1600"),
    ("collection-04.webp", "https://lh3.googleusercontent.com/d/1uY6GVfDtXanel3cZNDzsy74AXZyq5YeP=s1600")
]

req_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in sources:
    target_path = os.path.join(out_dir, fname)
    print(f"Downloading {fname} from {url}...")
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data)).convert("RGB")
            # Save as high quality WebP
            img.save(target_path, "WEBP", quality=90)
            print(f"Saved {fname}, size {img.size}")
    except Exception as e:
        print(f"Error for {fname}: {e}")

print("All collection images prepared successfully!")
