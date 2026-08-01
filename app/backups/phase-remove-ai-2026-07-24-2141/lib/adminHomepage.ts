import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import { db } from "./firebase";

const DOC_ID = "homepage";
const COLLECTION = "settings";

export async function getHomepageSettings(){

  const snap =
    await getDoc(
      doc(
        db,
        COLLECTION,
        DOC_ID
      )
    );

  if(!snap.exists()){

    return {
      featured:[],
      trending:[],
      bestseller:[],
      newArrival:[]
    };

  }

  return snap.data();

}

export async function saveHomepageSettings(
  data:any
){

  return setDoc(
    doc(
      db,
      COLLECTION,
      DOC_ID
    ),
    data
  );

}
