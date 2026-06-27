import Link from "next/link";

const items=[
["Dashboard","/cms/dashboard"],
["Products","/cms/products"],
["Orders","/cms/orders"],
["Categories","/cms/categories"],
["Customers","/cms/customers"],
["Media","/cms/media"],
["Analytics","/cms/analytics"],
["Server","/cms/server"],
["Settings","/cms/settings"]
];

export default function Sidebar(){

return(

<div className="w-72 bg-slate-900 text-white min-h-screen">

<div className="p-6 border-b border-slate-700">

<h1 className="text-2xl font-bold">
CMS V2
</h1>

<div className="text-xs text-slate-400">
Isolated Development
</div>

</div>

<nav className="p-3">

{items.map(([name,url])=>(

<Link
key={url}
href={url}
className="block rounded-xl px-4 py-3 hover:bg-slate-800"
>

{name}

</Link>

))}

</nav>

</div>

);

}
