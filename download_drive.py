import gdown
import os

folder_url = 'https://drive.google.com/drive/folders/1ARojHPhb5xv61fWRdzz2aYru5f49PIG2'
output_dir = 'public/products'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print("Starting download of Drive folder to public/products ...")
try:
    gdown.download_folder(folder_url, output=output_dir, quiet=False, use_cookies=False)
    print("Download completed or in progress.")
except Exception as e:
    print("Error:", e)
