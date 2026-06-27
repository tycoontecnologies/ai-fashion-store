import { execSync } from "child_process";
import { NextResponse } from "next/server";

export async function GET(){

  const ram = execSync("free -m").toString();
  const disk = execSync("df -h /").toString();
  const load = execSync("uptime").toString();

  return NextResponse.json({
    ram,
    disk,
    load
  });

}
