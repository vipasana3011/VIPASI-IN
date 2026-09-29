import os
from PIL import Image

src_path = r"C:\Users\ADMIN\.gemini\antigravity\brain\96cdc11c-a458-430f-8fa6-4128487b57b6\.user_uploaded\media_1790680418593.jpg"
out_dir = r"c:\PROJECT\Vipasi-in\public\brand"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert("RGBA")
width, height = img.size

# Sample background color near (10, 10)
bg_r, bg_g, bg_b, _ = img.getpixel((10, 10))
print(f"Sampled BG RGB: ({bg_r}, {bg_g}, {bg_b})")

# Create output image for wine logo
out_wine = Image.new("RGBA", (width, height))
out_gold = Image.new("RGBA", (width, height))

pixels = img.load()
wine_pixels = out_wine.load()
gold_pixels = out_gold.load()

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Euclidean distance in color space from background
        dist = ((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)**0.5
        
        # Soft alpha curve
        if dist < 22:
            alpha = 0
        elif dist > 70:
            alpha = 255
        else:
            alpha = int(((dist - 22) / (70 - 22)) * 255)
            
        wine_pixels[x, y] = (r, g, b, alpha)
        gold_pixels[x, y] = (223, 193, 155, alpha)

# Crop to non-transparent bounding box
bbox = out_wine.getbbox()
if bbox:
    pad = 20
    crop_box = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(width, bbox[2] + pad),
        min(height, bbox[3] + pad)
    )
    cropped_wine = out_wine.crop(crop_box)
    cropped_gold = out_gold.crop(crop_box)
else:
    cropped_wine = out_wine
    cropped_gold = out_gold

cropped_wine.save(os.path.join(out_dir, "logo.png"))
cropped_wine.save(os.path.join(out_dir, "logo-wine.png"))
cropped_gold.save(os.path.join(out_dir, "logo-gold.png"))
print("Saved transparent logo.png, logo-wine.png, and logo-gold.png successfully!")
print("Dimensions:", cropped_wine.size)
