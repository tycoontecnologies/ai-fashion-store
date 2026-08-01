
export async function getCategories(){

  const res =
    await fetch(
      "/api/admin/categories",
      {
        cache:"no-store"
      }
    );

  return res.json();

}


export async function addCategory(
  data:any
){

  return fetch(
    "/api/admin/categories",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }
  );

}


export async function updateCategory(
 id:string,
 data:any
){

 return fetch(
  "/api/admin/categories",
  {
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      id,
      ...data
    })
  }
 );

}


export async function deleteCategory(
 id:string
){

 return fetch(
  "/api/admin/categories",
  {
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      id
    })
  }
 );

}

