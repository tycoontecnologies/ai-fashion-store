from pathlib import Path
import json

ROOT = Path(r"D:\Projects\Guess360\app")

print("=" * 70)
print("GUESS360 CMS AUDIT")
print("=" * 70)

print("\nPRODUCT JSON FILES\n")

for p in ROOT.rglob("products.json"):

    try:
        data = json.loads(p.read_text(encoding="utf8"))

        if isinstance(data, list):
            count = len(data)
        else:
            count = "Not List"

    except Exception as e:
        count = f"ERROR ({e})"

    print(f"{p}")
    print(f"Products : {count}")
    print()

print("=" * 70)

print("\nIMAGE COUNTS\n")

folders = [
    ROOT / "public" / "products",
    ROOT / "public" / "uploads" / "products",
]

for folder in folders:

    if not folder.exists():
        print(folder)
        print("Missing\n")
        continue

    imgs = []

    for ext in ("*.jpg","*.jpeg","*.png","*.webp"):

        imgs.extend(folder.rglob(ext))
        imgs.extend(folder.rglob(ext.upper()))

    print(folder)
    print("Images :",len(imgs))
    print()

print("=" * 70)

print("\nFIRST 20 PRODUCTS\n")

for p in ROOT.rglob("products.json"):

    try:

        data=json.loads(p.read_text(encoding="utf8"))

        if isinstance(data,list):

            print("\nFILE:",p)

            for item in data[:20]:

                print("-",item.get("name","NO NAME"))

    except:
        pass

print("\nDONE")