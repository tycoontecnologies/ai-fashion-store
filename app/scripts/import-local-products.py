import os
import json
import uuid
from datetime import datetime


folders = [
    "public/products",
    "public/uploads/products"
]


products = []


for folder in folders:

    if not os.path.exists(folder):
        continue

    for root, dirs, files in os.walk(folder):

        for file in files:

            if file.lower().endswith(
                (".png",".jpg",".jpeg",".webp")
            ):

                path = "/" + os.path.join(
                    root,
                    file
                ).replace(
                    "public/",
                    ""
                )

                name = os.path.splitext(
                    file
                )[0].replace(
                    "_",
                    " "
                ).title()


                products.append({

                    "id": str(uuid.uuid4()),

                    "name": name,

                    "slug": name.lower()
                        .replace(" ","-"),

                    "image": path,

                    "gallery":[
                        path
                    ],

                    "category":
                        "Uncategorized",

                    "price":0,

                    "description":"",

                    "featured":False,

                    "trending":False,

                    "newArrival":False,

                    "createdAt":
                        datetime.now().isoformat()

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
    "TOTAL PRODUCTS:",
    len(products)
)

