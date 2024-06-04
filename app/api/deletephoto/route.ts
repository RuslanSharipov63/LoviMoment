const fs = require("fs");
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("fileName") as string;
  console.log(file);
  try {
    //const pathNewDir = await join("public", "image", "uploads");
    fs.unlink(`public${file}`, (err: any) => {
      if (err) throw err;
      console.log("path/file.txt was deleted");
    });
    return NextResponse.json({ message: true });
  } catch (error) {
    return NextResponse.json({ message: false });
  }
}
