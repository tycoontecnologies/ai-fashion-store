export async function saveVariants(
  productId:string,
  variants:any[]
){

  const res =
    await fetch("/api/cms/products");

  const products =
    await res.json();


  const index =
    products.findIndex(
      (p:any)=>p.id===productId
    );


  if(index===-1){
    throw new Error("Product not found");
  }


  products[index].variants =
    variants;


  const update =
    await fetch("/api/cms/products",
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(
        products[index]
      )
    });


  return await update.json();

}
