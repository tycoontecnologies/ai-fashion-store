import {
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "./firebase";

export async function saveVariants(
  productId:string,
  variants:any[]
){

  return updateDoc(
    doc(
      db,
      "products",
      productId
    ),
    {
      variants
    }
  );

}
