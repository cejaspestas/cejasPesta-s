import { NextResponse, NextRequest } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const rutas: string[] = [];

    if (!data) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    for (const [name, value] of data.entries()) {
      if (value instanceof File) {
        const fileBuffer = await value.arrayBuffer();
        const fileName = value.name;
        const fileType = value.type;

        // Crea un objeto File usando el buffer del archivo
        const file = new File([fileBuffer], fileName, { type: fileType });

        console.log("Preparando para subir archivo:", file);

        // Sube el archivo a UploadThing
        const response = await utapi.uploadFiles([file]);

        console.log("Respuesta de UploadThing:", response);

        if (!response?.[0]?.data?.url) {
          throw new Error("Error al subir archivo: No se devolvió una URL");
        }

        // Guarda la URL en el array de rutas
        rutas.push(response[0].data.url);
      } else {
        console.log("Entrada no válida:", name);
      }
    }

    console.log("Archivos subidos exitosamente:", rutas);
    return NextResponse.json(
      { message: "Files uploaded successfully", rutas: rutas },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
