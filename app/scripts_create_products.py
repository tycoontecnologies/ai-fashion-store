import os
import json
import uuid

folders = [
    "public/products",
    "public/uploads/products"
]

products = []

for folder in folders:

    if not os.path.exists(folder):
        continue

    for file in os.listdir(folder):

        if file.lower().endswith((".png",".jpg",".jpeg",".webp")):

            products.append({

                "id": str(uuid.uuid4()),

                "name": file.replace("_"," ")
                            .rsplit(".",1)[0]
                            .title(),

                "image": "/" + folder.replace("public/","") + "/" + file,

                "gallery": [
                    "/" + folder.replace("public/","") + "/" + file
                ],

                "category": "Fashion",

                "price": 0,

                "description": ""

            })


with open(
    "data/products.json",
    "w"
) as f:

    json.dump(
        products,
        f,
        indent=2
    )


print(
    "Created products:",
    len(products)
)
