import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request){

  const formData = await req.formData();

  const file = formData.get("file") as File;

  if(!file){
    return NextResponse.json(
      {
        success:false,
        message:"No file"
      },
      {
        status:400
      }
    );
  }

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const filename =
    Date.now() + "-" + file.name;

  const folder =
    path.join(
      process.cwd(),
      "public/uploads/categories"
    );

  const filepath =
    path.join(
      folder,
      filename
    );

  await writeFile(
    filepath,
    buffer
  );

  return NextResponse.json({
    success:true,
    url:`/uploads/categories/${filename}`
  });

}
