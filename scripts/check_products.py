import re

with open(r'c:\PROJECT\Vipasi-in\src\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('Madhurima')
print('Madhurima idx:', idx)
if idx != -1:
    print(content[idx-50:idx+600])

# Let's inspect all image URLs
urls = re.findall(r'https?://[^\s",]+', content)
print(f'Total URLs found: {len(urls)}')
for u in urls[:10]:
    print('URL sample:', u)
