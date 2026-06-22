import fitz # PyMuPDF
from PIL import Image
import io
import os

pdf_path = "d:/School Project/assets/details..pdf"
output_dir = "d:/School Project/assets/images/gallery/"
logo_path = "d:/School Project/assets/images/logo.png"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(pdf_path)
image_index = 0

print("Extracting images from PDF...")

for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        try:
            image = Image.open(io.BytesIO(image_bytes))
            
            # The first image is the logo (page 1)
            if page_index == 0 and img_index == 0:
                print(f"Saving logo...")
                image.save(logo_path, format="PNG", optimize=True)
            else:
                # Other images are gallery photos
                # Let's crop or just save them. The whatsapp screenshots might be the whole page.
                # Actually, some images are the full screenshot, some are the individual images if embedded properly.
                # If width and height are small, skip it
                if image.width < 100 or image.height < 100:
                    continue
                
                webp_path = os.path.join(output_dir, f"gallery_{image_index}.webp")
                print(f"Saving gallery image {image_index} ({image.width}x{image.height}) to {webp_path}")
                # Convert to RGB if necessary (e.g., if RGBA or P)
                if image.mode in ("RGBA", "P"):
                    image = image.convert("RGB")
                image.save(webp_path, format="WEBP", quality=80)
                image_index += 1
        except Exception as e:
            print(f"Failed to process image: {e}")

print("Extraction complete.")
