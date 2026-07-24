"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";


export default function Signup(){

const router = useRouter();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


function submit(e:any){

 e.preventDefault();

 localStorage.setItem(
   "user",
   JSON.stringify({
     email
   })
 );

 router.push("/");

}


return (

<div className="min-h-screen flex items-center justify-center">

<form
onSubmit={submit}
className="w-full max-w-md space-y-4 p-8 border rounded-xl"
>

<h1 className="text-3xl font-bold">
Create Account
</h1>


<input
className="w-full border p-3 rounded"
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>


<input
className="w-full border p-3 rounded"
placeholder="Password"
type="password"
value={password}
onChange={e=>setPassword(e.target.value)}
/>


<button
className="w-full bg-black text-white p-3 rounded"
>
Signup
</button>


</form>

</div>

);

}
