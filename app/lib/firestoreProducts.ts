import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getProducts() {

  const snap = await getDocs(collection(db,"products"));

  return snap.docs.map(doc=>({

    id:doc.id,

    ...doc.data()

  }));

}

export async function getProductById(id:string){

  const products=await getProducts();

  return products.find(p=>p.id===id) || null;

}

export async function getVariantGroup(group:string){

  if(!group) return [];

  const products=await getProducts();

  return products.filter(

    (p:any)=>p.variantGroup===group

  );

}