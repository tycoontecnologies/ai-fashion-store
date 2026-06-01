import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

export async function saveOrder(
  order: any
) {

  await addDoc(
    collection(
      db,
      "orders"
    ),
    order
  );

}

export async function getOrders() {

  const snapshot =
    await getDocs(
      collection(
        db,
        "orders"
      )
    );

  return snapshot.docs.map(
    (docItem) => ({

      id: docItem.id,

      ...docItem.data(),

    })
  );

}