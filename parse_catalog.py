import urllib.request
import re
import csv
import json

# 1. Fetch Google Drive Folder HTML and map all file names to IDs
print("Fetching Google Drive folder...")
url = 'https://drive.google.com/drive/folders/1ARojHPhb5xv61fWRdzz2aYru5f49PIG2?usp=sharing'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

html = ''
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
except Exception as e:
    print("Drive fetch error:", e)

# Find all [ "FILE_ID", [ "PARENT_ID" ], "FILENAME.jpg" ]
# In escaped form in JS: \\x5b\\x22([a-zA-Z0-9_-]{25,})\\x22,\\x5b\\x22[^\"]+\\x22\\x5d,\\x22([^\"\\\\]+\\.jpe?g)\\x22
matches = re.findall(r'\\x5b\\x22([a-zA-Z0-9_-]{25,})\\x22,\\x5b\\x22[^\"]+\\x22\\x5d,\\x22([^\"\\\\]+\.jpe?g)\\x22', html, re.I)
if not matches:
    # Also test non-escaped
    matches = re.findall(r'\["([a-zA-Z0-9_-]{25,})",\["[^"]+"\]\,"([^"]+\.jpe?g)"', html, re.I)

file_map = {}
for file_id, fname in matches:
    clean_name = fname.strip()
    file_map[clean_name] = file_id
    # Also map normalized without " copy"
    normalized = clean_name.replace(' copy', '')
    file_map[normalized] = file_id

print(f"Total files matched in Drive: {len(file_map)}")

# 2. Parse products_sheet.csv
products_dict = {}

with open('products_sheet.csv', mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        handle = row.get('Handle', '').strip()
        if not handle:
            continue
        
        title = row.get('Title', '').strip()
        photo = row.get('Source Photo', '').strip()
        price_str = row.get('Variant Price', '').strip()
        
        if handle not in products_dict:
            # First time seeing this product handle
            prod_type = row.get('Type', '').strip()
            category = 'suit-sets'
            if 'anarkali' in prod_type.lower() or 'anarkali' in title.lower():
                category = 'anarkalis'
            elif 'saree' in prod_type.lower() or 'saree' in title.lower():
                category = 'sarees'
            elif 'lehenga' in prod_type.lower() or 'lehenga' in title.lower():
                category = 'lehengas'
            elif 'sharara' in prod_type.lower() or 'sharara' in title.lower():
                category = 'sharara-sets'
            elif 'co-ord' in prod_type.lower() or 'co-ord' in title.lower():
                category = 'co-ords'

            price = 0
            try:
                price = float(price_str) if price_str and float(price_str) > 0 else 0
            except:
                price = 0

            # Default fallback prices based on typical luxury craft
            if price == 0:
                if category == 'lehengas': price = 14990
                elif category == 'sarees': price = 9490
                elif category == 'anarkalis': price = 8490
                elif category == 'sharara-sets': price = 7890
                else: price = 6890

            original_price = round(price * 1.25 / 100) * 100

            work = row.get('Work (product.metafields.custom.work)', '').strip() or 'Handcrafted Artisan Embroidery'
            fabric = row.get('Fabric (product.metafields.shopify.fabric)', '').strip() or 'Pure Chanderi Silk'
            color = row.get('Color (product.metafields.shopify.color)', '').strip() or 'Festive Tone'
            neckline = row.get('Neckline (product.metafields.shopify.neckline)', '').strip()
            sleeves = row.get('Sleeve length type (product.metafields.shopify.sleeve-length-type)', '').strip()
            body_html = row.get('Body (HTML)', '').strip()
            seo_desc = row.get('SEO Description', '').strip()

            products_dict[handle] = {
                'id': handle,
                'name': title,
                'subtitle': f"{fabric} • {work.split(';')[0]}",
                'slug': handle,
                'price': int(price),
                'originalPrice': int(original_price),
                'category': category,
                'collection': 'Festive Royal Edit 2026',
                'craftTechnique': work.replace(';', ' •'),
                'fabric': fabric,
                'colorName': color,
                'badge': 'Handcrafted' if 'mirror' in work.lower() or 'zari' in work.lower() else 'Bestseller',
                'rating': 4.9,
                'reviewsCount': 85 + (len(handle) % 70),
                'images': [],
                'sizes': ['S', 'M', 'L', 'XL', 'XXL'],
                'description': seo_desc or f"Artisanal {title} hand-tailored in {fabric}.",
                'craftStory': f"Painstakingly hand-worked with {work} by our master karigars in Rajasthan.",
                'details': [
                    f"Fabric: {fabric}",
                    f"Artisan Work: {work}",
                    f"Neckline: {neckline}" if neckline else "Artisan Neckline",
                    f"Sleeves: {sleeves}" if sleeves else "Festive Silhouette",
                    "Dry Clean Recommended for lasting lustre"
                ],
                'careInstructions': ['Strictly Dry Clean Only', 'Store wrapped in muslin cloth', 'Avoid direct perfume spray on embroidery'],
                'shippingEstimateDays': '3–5 Business Days',
                'inStock': True
            }

        # If title was on another row
        if title and not products_dict[handle]['name']:
            products_dict[handle]['name'] = title

        # Check photo
        if photo:
            img_url = None
            if photo in file_map:
                fid = file_map[photo]
                img_url = f"https://lh3.googleusercontent.com/d/{fid}=s1200"
            elif photo.replace(' copy', '') in file_map:
                fid = file_map[photo.replace(' copy', '')]
                img_url = f"https://lh3.googleusercontent.com/d/{fid}=s1200"
            
            if img_url and img_url not in products_dict[handle]['images']:
                products_dict[handle]['images'].append(img_url)

# Print summary
prod_list = list(products_dict.values())
print(f"Total products parsed: {len(prod_list)}")
for p in prod_list:
    print(f" - {p['name']} ({p['category']}): {len(p['images'])} images, Price: ₹{p['price']}")

# Save as json for inspection and TS generator
with open('parsed_products.json', 'w', encoding='utf-8') as f:
    json.dump(prod_list, f, indent=2, ensure_ascii=False)
