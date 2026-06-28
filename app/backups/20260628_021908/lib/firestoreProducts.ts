import {
  collection,
  getDocs,
  getDoc,
  doc
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
    d => ({
      id:d.id,
      ...d.data()
    })
  );

}

export async function getProductById(
  id:string
) {

  const snap =
    await getDoc(
      doc(
        db,
        "products",
        id
      )
    );

  if(!snap.exists())
    return null;

  return {
    id:snap.id,
    ...snap.data()
  };

}
