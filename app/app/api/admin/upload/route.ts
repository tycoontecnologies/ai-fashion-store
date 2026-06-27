import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req:any){

  const formData=await req.formData();

  const file=formData.get("file");

  if(!file){
    return Response.json(
      {success:false},
      {status:400}
    );
  }

  const bytes=await file.arrayBuffer();

  const buffer=Buffer.from(bytes);

  const filename=
    Date.now()+"-"+file.name;

  const filepath=
    path.join(
      process.cwd(),
      "public/uploads/products",
      filename
    );

  await writeFile(
    filepath,
    buffer
  );

  return Response.json({
    success:true,
    url:`/uploads/products/${filename}`
  });

}
