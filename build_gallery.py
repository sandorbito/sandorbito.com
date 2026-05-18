#!/usr/bin/env python3
"""
Web-galéria építő:
- SSD-ről forrásképeket olvas
- Auto-rotál EXIF alapján
- 2 méretben menti:
    full: 1800px széles, JPEG q=85   (lightbox view)
    thumb: 600px széles, JPEG q=78   (grid)
- Per-kategória JSON-t ír a JS lightbox-nak
"""
import os
import sys
import glob
import json
from pathlib import Path
from PIL import Image, ImageOps

OUT_DIR = Path(__file__).parent / "images"

# Kategória -> (forrás-mappa, "best" képek számossága, képfájlnév-előtag)
CATEGORIES = {
    "nizza-lights": {
        "title": "Nizza Lights",
        "src": "/media/abn-2025-01086/Crucial X9/Canon 5D mark II 2025.12.27. Nizza fényei/JPEG szerkesztett képek",
        "ext": ".jpeg",
        "max": 8,
        "pick": "largest",  # pick largest files (usually best quality keepers)
    },
    "entrevaux": {
        "title": "Entrevaux",
        "src_glob": "/media/abn-2025-01086/Crucial*/Entrevaux*",  # macOS U+F029 trailing char workaround
        "ext": ".JPG",
        "max": 8,
        "pick": "spread",  # spread out across the folder
    },
    "tour-de-france": {
        "title": "Tour de France",
        "src": "/media/abn-2025-01086/Crucial X9/Tour de France 2024",
        "ext": ".JPG",
        "max": 8,
        "pick": "spread",
    },
}

FULL_WIDTH = 1800
THUMB_WIDTH = 600
JPEG_FULL_Q = 85
JPEG_THUMB_Q = 78


def list_images(conf):
    if "src_glob" in conf:
        matches = glob.glob(conf["src_glob"])
        if not matches:
            print(f"!! glob nem talál: {conf['src_glob']}")
            return []
        src = matches[0]
    else:
        src = conf["src"]
    p = Path(src)
    if not p.exists():
        print(f"!! mappa hiányzik: {src}")
        return []
    ext = conf["ext"]
    files = [f for f in p.iterdir()
             if f.is_file()
             and f.suffix.lower() == ext.lower()
             and not f.name.startswith("._")]
    return sorted(files)


def pick_subset(files, count, mode):
    if len(files) <= count:
        return files
    if mode == "largest":
        return sorted(files, key=lambda f: f.stat().st_size, reverse=True)[:count]
    # spread: evenly spaced across the list
    step = len(files) / count
    return [files[int(i * step)] for i in range(count)]


def process_image(src_path: Path, full_out: Path, thumb_out: Path):
    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)  # auto-rotate
    img = img.convert("RGB")

    # Full
    if img.width > FULL_WIDTH:
        h = int(img.height * FULL_WIDTH / img.width)
        full = img.resize((FULL_WIDTH, h), Image.LANCZOS)
    else:
        full = img.copy()
    full.save(full_out, "JPEG", quality=JPEG_FULL_Q, optimize=True, progressive=True)

    # Thumb
    if img.width > THUMB_WIDTH:
        h = int(img.height * THUMB_WIDTH / img.width)
        thumb = img.resize((THUMB_WIDTH, h), Image.LANCZOS)
    else:
        thumb = img.copy()
    thumb.save(thumb_out, "JPEG", quality=JPEG_THUMB_Q, optimize=True, progressive=True)

    return full.size


def main():
    OUT_DIR.mkdir(exist_ok=True)
    manifest = {}

    for slug, conf in CATEGORIES.items():
        print(f"\n🎨 {slug}  ({conf['title']})")
        files = list_images(conf)
        if not files:
            print(f"  -- nincs fájl, kihagyva")
            continue
        picked = pick_subset(files, conf["max"], conf["pick"])
        print(f"  forrásban: {len(files)} db,  választva: {len(picked)}")

        cat_dir = OUT_DIR / slug
        cat_dir.mkdir(exist_ok=True)

        photos = []
        for i, src in enumerate(picked, start=1):
            stem = f"{slug}-{i:02d}"
            full_out = cat_dir / f"{stem}.jpg"
            thumb_out = cat_dir / f"{stem}-thumb.jpg"
            try:
                size = process_image(src, full_out, thumb_out)
                photos.append({
                    "full": f"images/{slug}/{stem}.jpg",
                    "thumb": f"images/{slug}/{stem}-thumb.jpg",
                    "w": size[0],
                    "h": size[1],
                })
                print(f"  ✓ {stem}  {size[0]}x{size[1]}")
            except Exception as e:
                print(f"  ✗ {src.name}: {e}")

        manifest[slug] = {
            "title": conf["title"],
            "photos": photos,
        }

    manifest_path = OUT_DIR / "manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"\n✅ manifest mentve: {manifest_path}")


if __name__ == "__main__":
    main()
