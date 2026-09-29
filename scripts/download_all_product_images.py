import os
import re
import urllib.request
import concurrent.futures

PRODUCTS_FILE = r'c:\PROJECT\Vipasi-in\src\data\products.ts'
OUT_DIR = r'c:\PROJECT\Vipasi-in\public\images\products'
os.makedirs(OUT_DIR, exist_ok=True)

with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all Google Drive / lh3 URLs
url_pattern = re.compile(r'https://lh3\.googleusercontent\.com/d/([a-zA-Z0-9_-]+)=s\d+')
matches = list(set(url_pattern.findall(content)))
print(f"Found {len(matches)} unique image IDs to download.")

def download_image(img_id):
    out_path = os.path.join(OUT_DIR, f"{img_id}.jpg")
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        return img_id, True, "Already exists"
    
    url = f"https://lh3.googleusercontent.com/d/{img_id}=s1200"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
            if len(data) > 500:
                with open(out_path, 'wb') as f:
                    f.write(data)
                return img_id, True, f"Saved ({len(data)} bytes)"
            else:
                return img_id, False, "Too small"
    except Exception as e:
        return img_id, False, str(e)

# Download in parallel using ThreadPoolExecutor
success_count = 0
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    futures = {executor.submit(download_image, img_id): img_id for img_id in matches}
    for future in concurrent.futures.as_completed(futures):
        img_id, ok, msg = future.result()
        if ok:
            success_count += 1
            print(f"[OK] {img_id}: {msg}")
        else:
            print(f"[FAIL] {img_id}: {msg}")

print(f"\nDownload complete: {success_count}/{len(matches)} images downloaded successfully.")

# Replace URLs in products.ts with local static paths: /images/products/{id}.jpg
def replace_url(match):
    img_id = match.group(1)
    local_file = os.path.join(OUT_DIR, f"{img_id}.jpg")
    if os.path.exists(local_file) and os.path.getsize(local_file) > 1000:
        return f"/images/products/{img_id}.jpg"
    return match.group(0)

new_content = url_pattern.sub(replace_url, content)

with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated src/data/products.ts with local image paths!")
