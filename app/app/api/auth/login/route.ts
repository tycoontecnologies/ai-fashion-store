import {NextRequest,NextResponse} from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";


export async function POST(req:NextRequest){

const {email,password}=await req.json();


const file=path.join(
process.cwd(),
"data/cms/users.json"
);


const users=JSON.parse(
fs.readFileSync(file,"utf8")
);


const user=users.find(
(u:any)=>u.email===email && u.password===password
);


if(!user){

return NextResponse.json(
{
success:false,
message:"Invalid credentials"
},
{
status:401
}
);

}


const token=crypto
.randomBytes(32)
.toString("hex");


const res=NextResponse.json({
success:true,
user:{
email:user.email,
role:user.role
}
});


res.cookies.set(
"guess360_session",
token,
{
httpOnly:true,
secure:false,
sameSite:"lax",
maxAge:60*60*24*7
}
);


return res;

}
