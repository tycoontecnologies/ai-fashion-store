import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "./firebase";

const COLLECTION = "categories";

export async function getCategories(){
  const snap = await getDocs(collection(db,COLLECTION));
  return snap.docs.map(d=>({
    id:d.id,
    ...d.data()
  }));
}

export async function addCategory(name:string){
  return addDoc(
    collection(db,COLLECTION),
    {
      name,
      createdAt:Date.now()
    }
  );
}

export async function updateCategory(
  id:string,
  name:string
){
  return updateDoc(
    doc(db,COLLECTION,id),
    { name }
  );
}

export async function deleteCategory(
  id:string
){
  return deleteDoc(
    doc(db,COLLECTION,id)
  );
}
