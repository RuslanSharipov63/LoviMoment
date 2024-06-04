import { join } from "path";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as any;
  const id = formData.get("id") as string;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }
  /* const dateCreatePhoto = await dateFn.format(Date.now(), "dd-MM-y"); */
  const pathNewDir = await join("public", "image", "uploads", id);
  /* const uploadDir = await join(pathNewDir, dateCreatePhoto); */

  await mkdir(`${pathNewDir}`, {recursive: true});

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(`${pathNewDir}/${file.name}`, buffer);
    return NextResponse.json({ message: "файл сохранен" });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: "Не удалось сохранить файл" });
  }
}
