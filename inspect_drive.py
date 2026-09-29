import urllib.request
import re

url = 'https://drive.google.com/drive/folders/1ARojHPhb5xv61fWRdzz2aYru5f49PIG2?usp=sharing'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# Save raw HTML to inspect
with open('drive_raw.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Saved drive_raw.html length:", len(html))

# Let's search for "DSC" in the html
dsc_pos = [m.start() for m in re.finditer(r'DSC08', html)]
print("Found DSC08 occurrences:", len(dsc_pos))
for p in dsc_pos[:10]:
    snippet = html[max(0, p-100):min(len(html), p+100)]
    print("--- SNIPPET ---")
    print(snippet)
