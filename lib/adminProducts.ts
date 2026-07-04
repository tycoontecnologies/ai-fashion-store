import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

const COLLECTION = "products";

export interface VariantAttribute{
  key:string;
  value:string;
}

export interface ProductVariant{
  id:string;

  name?:string;

  sku:string;

  price:number;

  stock:number;

  image:string;

  images?:string[];

  attributes?:VariantAttribute[];
}

export interface AdminProduct {
  id?: string;

  name: string;
  slug?: string;

  category: string;
  description: string;

  price: number;
  comparePrice?: number;

  sku?: string;

  image: string;

  gallery: string[];

  variants: ProductVariant[];
  variantGroup?: string;

  brand?: string;

  color?: string;

gender?: string;

tags?: string[];

discount?: number;

currency?: string;

material?: string;

weight?: number;

seoTitle?: string;

seoDescription?: string;

rating?: number;

sales?: number;

views?: number;

isDeleted?: boolean;

  featured: boolean;
  trending: boolean;
  bestseller: boolean;
  newArrival: boolean;

  active: boolean;

  createdAt?: any;
  updatedAt?: any;
}

function normalize(product: any): AdminProduct {
  return {
    id: product.id,

    name: product.name || "",

    slug: product.slug || "",

    category: product.category || "",

    description: product.description || "",

    price: Number(product.price || 0),

    comparePrice: Number(product.comparePrice || 0),

    sku: product.sku || "",

    image: product.image || "",

    gallery: Array.isArray(product.gallery)
      ? product.gallery
      : [],

    variants: Array.isArray(product.variants)
      ? product.variants.map((v:any)=>({
          images:[],
          attributes:[],
          ...v
        }))
      : [],
      variantGroup: product.variantGroup || "",

    featured: !!product.featured,

    trending: !!product.trending,

    bestseller: !!product.bestseller,

    newArrival: !!product.newArrival,

    brand: product.brand || "",

gender: product.gender || "",

tags: Array.isArray(product.tags)
  ? product.tags
  : [],

discount: Number(product.discount || 0),

currency: product.currency || "PKR",

material: product.material || "",

weight: Number(product.weight || 0),

seoTitle: product.seoTitle || "",

seoDescription: product.seoDescription || "",

rating: Number(product.rating || 0),

sales: Number(product.sales || 0),

views: Number(product.views || 0),

isDeleted: !!product.isDeleted,

    active:
      product.active === undefined
        ? true
        : !!product.active,

    createdAt: product.createdAt,

    updatedAt: product.updatedAt,
  };
}

export async function getProducts() {
  const q = query(
    collection(db, COLLECTION),
    orderBy("name")
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) =>
    normalize({
      id: d.id,
      ...d.data(),
    })
  );
}

export async function getProduct(id: string) {
  const snap = await getDoc(
    doc(db, COLLECTION, id)
  );

  if (!snap.exists()) return null;

  return normalize({
    id: snap.id,
    ...snap.data(),
  });
}

export async function saveProduct(
  product: AdminProduct
) {
  const normalized = normalize(product);

  delete normalized.id;

  const payload = {
    ...normalized,

    publishedAt: serverTimestamp(),

    rating: 0,
    sales: 0,
    views: 0,
    isDeleted: false,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const ref = await addDoc(
    collection(db, COLLECTION),
    payload
  );

  return {
    id: ref.id,
    ...payload,
  };
}
export async function updateProduct(
  id: string,
  product: Partial<AdminProduct>
) {
  const payload = {
    ...product,

    updatedAt: serverTimestamp(),
  };

  await updateDoc(
    doc(db, COLLECTION, id),
    payload
  );

  return true;
}

export async function deleteProduct(
  id: string
) {
  await updateDoc(

doc(db,COLLECTION,id),

{

active:false,

isDeleted:true,

updatedAt:serverTimestamp()

}

);

  return true;
}

export async function duplicateProduct(
  id: string
) {
  const product = await getProduct(id);

  if (!product) return null;

  delete product.id;

  product.name =
    product.name + " Copy";

  product.sales = 0;
product.views = 0;
product.rating = 0;
product.isDeleted = false;

product.createdAt = serverTimestamp();
product.updatedAt = serverTimestamp();

return saveProduct(product);
}

