import os
import sys
from PIL import Image

def optimize_images():
    img_dir = 'public/images'
    total_before = 0
    total_after_orig = 0
    total_webp = 0

    files = [f for f in os.listdir(img_dir) if os.path.isfile(os.path.join(img_dir, f))]
    
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext not in ['.png', '.jpg', '.jpeg', '.webp']:
            continue
        
        path = os.path.join(img_dir, f)
        size_before = os.path.getsize(path)
        total_before += size_before
        
        try:
            with Image.open(path) as im:
                im_format = im.format
                orig_mode = im.mode
                w, h = im.size
                
                # Resize if excessively large (e.g. > 1920)
                if max(w, h) > 1920:
                    im.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
                
                # 1. Generate WebP
                webp_name = os.path.splitext(f)[0] + '.webp'
                webp_path = os.path.join(img_dir, webp_name)
                
                # Convert RGBA or RGB
                if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                    im.save(webp_path, 'WEBP', quality=85, method=6)
                else:
                    rgb_im = im.convert('RGB')
                    rgb_im.save(webp_path, 'WEBP', quality=85, method=6)
                
                size_webp = os.path.getsize(webp_path)
                total_webp += size_webp
                
                # 2. Re-save original with optimization if PNG or JPEG
                if ext in ('.jpg', '.jpeg'):
                    rgb_im = im.convert('RGB')
                    rgb_im.save(path, 'JPEG', quality=82, optimize=True)
                elif ext == '.png' and f != 'dimisi-horizontal.png':
                    # Only re-save PNG if it saves space
                    tmp_path = path + '.tmp'
                    im.save(tmp_path, 'PNG', optimize=True)
                    if os.path.getsize(tmp_path) < size_before:
                        os.replace(tmp_path, path)
                    else:
                        if os.path.exists(tmp_path):
                            os.remove(tmp_path)
                            
                size_after = os.path.getsize(path)
                total_after_orig += size_after
                print(f"Processed {f}: {size_before/1024:.1f}KB -> orig: {size_after/1024:.1f}KB, webp: {size_webp/1024:.1f}KB")
        except Exception as e:
            print(f"Error processing {f}: {e}")

    print("=" * 60)
    print(f"Total original size: {total_before / (1024*1024):.2f} MB")
    print(f"Total optimized original size: {total_after_orig / (1024*1024):.2f} MB")
    print(f"Total WebP size: {total_webp / (1024*1024):.2f} MB")

if __name__ == '__main__':
    optimize_images()
