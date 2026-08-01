"use client";

import { Search, Bell, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Topbar() {

  const router = useRouter();

  const { user, logout } = useAuth();

  async function handleLogout() {

    await logout();

    router.replace("/admin");

  }

  return (

    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <div className="relative w-96">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          placeholder="Search..."
          className="w-full h-10 rounded-xl border border-gray-200 pl-10 pr-4"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell size={20} />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
            <User size={18} className="text-black"/>
          </div>

          <div>
            <div className="font-semibold">
              {user?.displayName || "Administrator"}
            </div>
            <div className="text-xs text-gray-500">
              {user?.email}
            </div>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-gray-100"
        >
          <LogOut size={16}/>
          Logout
        </button>

      </div>

    </header>

  );

}
