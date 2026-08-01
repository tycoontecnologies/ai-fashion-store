"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingCart,
  Image,
  Home,
  BarChart3,
  Settings,
  Sparkles
} from "lucide-react";

const menu = [
  { title:"Dashboard", href:"/admin/dashboard", icon:LayoutDashboard },
  { title:"Products", href:"/admin/products", icon:Package },
  { title:"Categories", href:"/admin/categories", icon:FolderTree },
  { title:"Variants", href:"/admin/variants", icon:Boxes },
  { title:"Orders", href:"/admin/orders", icon:ShoppingCart },
  { title:"Media", href:"/admin/media", icon:Image },
  { title:"Homepage", href:"/admin/homepage", icon:Home },
  { title:"Analytics", href:"/admin/analytics", icon:BarChart3 },
  { title:"AI Tools", href:"/admin/ai", icon:Sparkles },
  { title:"Settings", href:"/admin/settings", icon:Settings },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside className="w-72 bg-black text-white flex flex-col">

      <div className="h-20 flex items-center px-8 border-b border-white/10">

        <div>

          <h1 className="text-3xl font-black tracking-wide">
            GUESS360
          </h1>

          <p className="text-xs text-gray-400">
            ADMIN CMS
          </p>

        </div>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map(item=>{

          const Icon=item.icon;

          return(

            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname===item.href
                  ? "bg-[#D4AF37] text-black font-bold"
                  : "hover:bg-white/10"
              }`}
            >

              <Icon size={18}/>

              {item.title}

            </Link>

          );

        })}

      </nav>

    </aside>

  );

}
