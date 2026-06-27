import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import AdminGuard from "./AdminGuard";

export default function AdminLayout({
  children,
}:{
  children:React.ReactNode;
}){

  return(

    <AdminGuard>

      <div className="min-h-screen flex bg-[#f6f7f9]">

        <Sidebar/>

        <div className="flex-1 flex flex-col">

          <Topbar/>

          <main className="flex-1 overflow-auto">

            {children}

          </main>

        </div>

      </div>

    </AdminGuard>

  );

}
