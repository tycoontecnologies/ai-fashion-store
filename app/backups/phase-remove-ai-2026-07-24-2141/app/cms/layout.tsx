import Sidebar from "@/components/cms/Sidebar";
import Header from "@/components/cms/Header";

export default function CMSLayout({
children,
}:{
children:React.ReactNode
}){

return(

<div className="flex bg-slate-100 min-h-screen">

<Sidebar/>

<div className="flex-1">

<Header/>

<div className="p-8">

{children}

</div>

</div>

</div>

);

}
