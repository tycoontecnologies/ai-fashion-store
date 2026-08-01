"use client";

import {useEffect,useState} from "react";

export default function Categories(){

const [items,setItems]=useState<any[]>([]);
const [name,setName]=useState("");
const [image,setImage]=useState("");
const [file,setFile]=useState<File|null>(null);


async function load(){

 const res=await fetch(
  "/api/admin/categories",
  {
   cache:"no-store"
  }
 );

 setItems(await res.json());

}


useEffect(()=>{
 load();
},[]);



async function uploadImage(){

 if(!file)
  return "";

 const fd=new FormData();

 fd.append(
  "file",
  file
 );


 const res=await fetch(
  "/api/admin/categories/upload",
  {
   method:"POST",
   body:fd
  }
 );


 const data=await res.json();

 return data.url;

}



async function save(){

 if(!name)
  return;


 let img=image;

 if(file){
  img=await uploadImage();
 }


 await fetch(
  "/api/admin/categories",
  {
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    name,
    image:img
   })
  }
 );


 setName("");
 setImage("");
 setFile(null);

 load();

}



async function remove(id:string){

 await fetch(
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

 load();

}



return (

<div className="p-10">

<h1 className="text-4xl font-black mb-8">
Categories CMS
</h1>


<div className="
bg-white
rounded-3xl
p-6
mb-10
space-y-4
">

<input
className="
border
p-3
rounded-xl
w-full
"
placeholder="Category name"
value={name}
onChange={
e=>setName(e.target.value)
}
/>


<input
type="file"
accept="image/*"
onChange={
e=>setFile(
 e.target.files?.[0] || null
)
}
/>


<button
onClick={save}
className="
bg-black
text-white
px-8
py-3
rounded-xl
"
>
Save Category
</button>

</div>



<div className="
grid
md:grid-cols-3
gap-6
">


{
items.map((c:any)=>(

<div
key={c.id}
className="
bg-white
rounded-3xl
p-5
"
>


{
c.image &&
<img
src={c.image}
className="
h-40
w-full
object-cover
rounded-xl
mb-4
"
/>
}


<h2 className="text-xl font-bold">
{c.name}
</h2>


<button
onClick={()=>remove(c.id)}
className="
mt-4
bg-red-600
text-white
px-4
py-2
rounded-lg
"
>
Delete
</button>


</div>

))
}


</div>


</div>

);

}
