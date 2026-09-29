import json

content = open('src/data/products.ts', encoding='utf-8').read()

OCCASIONS_MAP = {
    "sitara-ivory-georgette-sharara-set": (["mehendi", "reception", "festive"], "medium"),
    "sehar-ivory-chiffon-anarkali-set": (["festive", "reception"], "medium"),
    "chandni-ivory-chanderi-sharara-set": (["mehendi", "festive", "reception"], "medium"),
    "sindoori-rust-chanderi-lehenga-set": (["wedding", "festive"], "heavy"),
    "anaar-rani-pink-chanderi-anarkali-set": (["mehendi", "wedding", "festive"], "heavy"),
    "mahtab-magenta-chanderi-anarkali-set": (["mehendi", "festive", "haldi"], "medium"),
    "vann-emerald-silk-anarkali-set": (["mehendi", "wedding", "festive"], "heavy"),
    "sindoori-red-georgette-kurta-set": (["wedding", "festive"], "heavy"),
    "gulaal-orange-pink-georgette-anarkali-set": (["festive", "haldi", "mehendi"], "medium"),
    "chandni-crimson-silk-anarkali-set": (["wedding", "festive"], "heavy"),
    "hariyali-lime-green-chanderi-sharara-set": (["haldi", "mehendi", "festive"], "medium"),
    "meher-peach-chanderi-sharara-set": (["haldi", "reception", "festive"], "medium"),
    "meher-blush-pink-silk-anarkali-set": (["haldi", "mehendi", "festive"], "light"),
    "lehar-turquoise-georgette-co-ord-set": (["reception", "festive"], "light"),
    "sehar-peach-organza-saree": (["reception", "wedding", "festive"], "heavy"),
    "titli-blush-peach-organza-saree": (["reception", "haldi", "festive"], "light"),
    "sitara-ivory-georgette-lehenga-set": (["wedding", "reception"], "heavy"),
    "saanjh-powder-blue-chiffon-saree": (["reception", "festive"], "light"),
    "sunehri-lemon-organza-saree": (["haldi", "festive"], "light"),
    "dhoop-marigold-chiffon-saree": (["haldi", "festive"], "light"),
    "sahar-blush-peach-georgette-anarkali-set": (["haldi", "reception", "festive"], "light"),
    "kesari-rust-chanderi-anarkali-set": (["haldi", "festive"], "medium"),
}

split_token = '\nexport const CATEGORIES'
parts = content.split(split_token)

prefix = "import { Product } from '@/types/product';\n\nexport const FEATURED_PRODUCTS: Product[] = "
json_str = parts[0].replace("import { Product } from '@/types/product';", "").replace("export const FEATURED_PRODUCTS: Product[] = ", "").strip()
if json_str.endswith(';'):
    json_str = json_str[:-1].strip()

products = json.loads(json_str)

for p in products:
    pid = p['id']
    if pid in OCCASIONS_MAP:
        p['occasions'] = OCCASIONS_MAP[pid][0]
        p['weightLevel'] = OCCASIONS_MAP[pid][1]

new_content = prefix + json.dumps(products, indent=2) + ';\n' + split_token + parts[1]
with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Successfully enriched {len(products)} products with occasion metadata!")
