import { join } from "path";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as any;
    const id = formData.get("id") as string;
    const pathNewDir = await join("public", "image", "accounts", id);
    /* const uploadDir = await join(pathNewDir, dateCreatePhoto); */
  
    await mkdir(`${pathNewDir}`, {recursive: true});
  
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(`${pathNewDir}/${file.name}`, buffer);
      return NextResponse.json({success: true });
    } catch (e: any) {
      console.log(e);
      return NextResponse.json({ success: false });
    }
  }