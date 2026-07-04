import json
import shutil
import uuid
from pathlib import Path

ROOT = Path(r"D:\Projects\Guess360")

APP = ROOT / "app"

IMPORT = ROOT / "Import"

PUBLIC_PRODUCTS = APP / "public" / "products"
UPLOAD_PRODUCTS = APP / "public" / "uploads" / "products"

JSON_FILES = [
    APP / "products.json",
    APP / "src" / "data" / "products.json",
]

BACKUP = APP / "backups" / "catalog_backup"

BACKUP.mkdir(parents=True, exist_ok=True)

# ---------------- Backup ----------------

for j in JSON_FILES:
    if j.exists():
        shutil.copy2(j, BACKUP / j.name)

if PUBLIC_PRODUCTS.exists():
    shutil.copytree(
        PUBLIC_PRODUCTS,
        BACKUP / "products",
        dirs_exist_ok=True
    )

# ---------------- Clean ----------------

if PUBLIC_PRODUCTS.exists():
    shutil.rmtree(PUBLIC_PRODUCTS)

PUBLIC_PRODUCTS.mkdir(parents=True, exist_ok=True)

if UPLOAD_PRODUCTS.exists():
    shutil.rmtree(UPLOAD_PRODUCTS)

UPLOAD_PRODUCTS.mkdir(parents=True, exist_ok=True)

products = []

counter = 1

for folder in sorted(IMPORT.iterdir()):

    if not folder.is_dir():
        continue

    for img in sorted(folder.glob("*")):

        if img.suffix.lower() not in (
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ):
            continue

        ext = img.suffix.lower()

        filename = f"product_{counter:04d}{ext}"

        shutil.copy2(
            img,
            PUBLIC_PRODUCTS / filename
        )

        products.append({

            "id": str(uuid.uuid4()),

            "sku": f"GUESS-{counter:05d}",

            "slug": f"draft-product-{counter}",

            "name": f"Draft Product {counter}",

            "status": "draft",

            "brand": "Guess",

            "category": "",

            "gender": "",

            "color": "",

            "price": 0,

            "images": [
                f"/products/{filename}"
            ],

            "variants": []

        })

        counter += 1

for jf in JSON_FILES:
    jf.parent.mkdir(parents=True, exist_ok=True)

    with open(jf, "w", encoding="utf8") as f:
        json.dump(products, f, indent=2)

print("=" * 60)
print("Catalog Reset Complete")
print("Products:", len(products))
print("Images:", len(products))
print("=" * 60)