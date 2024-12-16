import { writeFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import { join, extname } from "path";


export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    let rutas: string[] = [];

    if (!data) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
  
    for (let [name, value] of data.entries()) {
      // Verificamos si el valor es un archivo
      if (value instanceof File) {
        const bytes = await value.arrayBuffer();
        const buffer = Buffer.from(bytes);
  
        const extnamess = extname(value.name);
        const name = new Date().getTime().toString(30);
        const filePath = join(process.cwd(), "public", "images", `${name}${extnamess}`);
        rutas.push(`/images/${name}${extnamess}`);
        // Guardar el archivo
        await writeFile(filePath, buffer);
        console.log(`Archivo guardado: ${filePath}`);
      } else {
        console.log("No es un archivo válido");
      }
    }
  
    console.log("File uploaded successfully");
    return NextResponse.json({ message: "File uploaded successfully" , rutas: rutas} , { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
