with open(r'c:\PROJECT\Vipasi-in\src\data\products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
from collections import Counter
cats = re.findall(r'"category":\s*"([^"]+)"', text)
print("Categories:", Counter(cats))
crafts = re.findall(r'"craftTechnique":\s*"([^"]+)"', text)
print("Crafts count:", len(crafts))
