
export type Product = {
  id:string;
  name:string;
  slug?:string;
  image:string;
  gallery?:string[];
  category?:string;
  price?:number;
  description?:string;
  featured?:boolean;
  trending?:boolean;
  newArrival?:boolean;
  [key:string]:any;
};


async function api(){

  const res = await fetch(
    "/api/products",
    {
      cache:"no-store"
    }
  );

  return await res.json();

}


export async function getProducts(){

  return await api();

}


export async function getProduct(id:string){

  const products = await api();

  return products.find(
    (p:any)=>
      p.id===id ||
      p.slug===id
  );

}


export async function getProductById(id:string){

  return getProduct(id);

}


export async function getVariantGroup(groupId?:string){

  const products = await api();

  if(!groupId){
    return [];
  }

  return products.filter(
    (p:any)=>
      p.variantGroup===groupId
  );

}


// compatibility functions

export async function saveProduct(product:any){

  console.log(
    "LOCAL SAVE PRODUCT",
    product
  );

  return product;

}


export async function updateProduct(
 id:string,
 data:any
){

  console.log(
    "LOCAL UPDATE PRODUCT",
    id,
    data
  );

  return {
    id,
    ...data
  };

}


export async function deleteProduct(
 id:string
){

  console.log(
    "LOCAL DELETE PRODUCT",
    id
  );

  return true;

}

// legacy compatibility
export const products:any[] = [];

