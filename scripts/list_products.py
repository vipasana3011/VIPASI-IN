import re

content = open('src/data/products.ts', encoding='utf-8').read()
products = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"subtitle":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"price":\s*(\d+),.*?category":\s*"([^"]+)",.*?craftTechnique":\s*"([^"]+)",\s*"fabric":\s*"([^"]+)",\s*"colorName":\s*"([^"]+)"', content, re.DOTALL)

for p in products:
    print(f"ID: {p[0]} | Name: {p[1]} | Cat: {p[5]} | Fabric: {p[7]} | Craft: {p[6]} | Color: {p[8]}")
