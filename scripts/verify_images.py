import os
import re

with open(r'c:\PROJECT\Vipasi-in\src\data\products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

img_paths = re.findall(r'"(/images/products/[^"]+)"', text)
print(f"Total local product image references: {len(img_paths)}")
missing = [p for p in img_paths if not os.path.exists(os.path.join(r'c:\PROJECT\Vipasi-in\public', p.lstrip('/')))]
print(f"Missing images: {len(missing)}")
if missing:
    print("Sample missing:", missing[:5])
else:
    print("ALL PRODUCT IMAGES EXIST LOCALLY ON DISK!")
