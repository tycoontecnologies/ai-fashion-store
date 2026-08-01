import {
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export async function getProducts() {

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

      ...docItem.data(),

    })
  );

}

export async function getProductById(
  id: string
) {

  const snapshot =
    await getDoc(
      doc(
        db,
        "products",
        id
      )
    );

  if (!snapshot.exists()) {

    return null;

  }

  return {

    id: snapshot.id,

    ...snapshot.data(),

  };

}