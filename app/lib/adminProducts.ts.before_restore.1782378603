import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export interface AdminProduct {

  id?: string;

  name: string;

  color: string;

  category: string;

  price: number;

  description: string;

  image: string;

}

export async function getProducts(): Promise<AdminProduct[]> {

  const snapshot =
    await getDocs(
      collection(
        db,
        "products"
      )
    );

  return snapshot.docs.map(
    (docItem) => ({

      id: docItem.id,

      ...(docItem.data() as Omit<
        AdminProduct,
        "id"
      >),

    })
  );

}

export async function saveProduct(
  product: AdminProduct
) {

  await addDoc(
    collection(
      db,
      "products"
    ),
    product
  );

}

export async function deleteProduct(
  id: string
) {

  await deleteDoc(
    doc(
      db,
      "products",
      id
    )
  );

}