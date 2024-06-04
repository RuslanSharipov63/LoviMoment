import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { mkdir, writeFile, copyFile } from "fs/promises";


export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as Blob | null | any;
  const userId = formData.get("id") as string;
  const pathNewDir = join("public", "image", "accounts");
  await mkdir(`${pathNewDir}/${userId}`)
  const uploadDir = join(pathNewDir, userId)
  if (file === null) {
    await copyFile(`${pathNewDir}/photouserdefault.png`, `${uploadDir}/photouserdefault.png`);
    return NextResponse.json({ message: "ok" });
  }
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(`${uploadDir}/${file.name}`, buffer);
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Не удалось сохранить файл" });
  }
}