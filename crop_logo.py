from PIL import Image

def crop_transparent_edges(image_path, output_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        
        bbox = img.getbbox()
        if bbox:
            cropped_img = img.crop(bbox)
            cropped_img.save(output_path)
            print(f"Successfully cropped and saved to {output_path}")
        else:
            print("Image is entirely transparent or bounding box not found.")
            
    except Exception as e:
        print(f"Error: {e}")

crop_transparent_edges("images/logo_cinta.png", "images/logo_cinta_cropped.png")
