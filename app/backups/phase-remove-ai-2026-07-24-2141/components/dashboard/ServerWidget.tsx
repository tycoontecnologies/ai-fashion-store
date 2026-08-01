"use client";

import { useEffect,useState } from "react";

export default function ServerWidget(){

  const [data,setData]=useState<any>(null);

  useEffect(()=>{
    fetch("/api/admin/server")
      .then(r=>r.json())
      .then(setData);
  },[]);

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-bold mb-4">
        Server Resources
      </h3>

      <pre className="text-xs overflow-auto">
        {JSON.stringify(data,null,2)}
      </pre>
    </div>
  );
}
