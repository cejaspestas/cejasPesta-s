import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN!, // Asegúrate de que el token de UploadThing esté correctamente configurado
});

export async function DELETE(request: Request) {
    try {
        const servioId = request.url.split('/')[request.url.split('/').length - 1];
        const servicio = await db.servicio.findUnique({ where: { id: servioId }});

        if (!servicio) {
            return NextResponse.json({ error: 'No se ha encontrado el cliente' }, { status: 404 });
        }
        
        // Verifica que el servicio tiene una imagenRuta válida
        if (!servicio.imagenRuta) {
            return NextResponse.json({ error: 'No hay imagen asociada al servicio' }, { status: 400 });
        }

        const deleteImage = servicio.imagenRuta.split('/').pop();
        const response = await utapi.deleteFiles([deleteImage] as string[]);

        // Verifica si la eliminación fue exitosa
        if (!response || !response.success) {
            console.error("Error al eliminar el archivo en UploadThing:", response);
            return NextResponse.json({ error: "Error al eliminar el archivo" }, { status: 500 });
        }
        
        console.log("Archivo eliminado exitosamente:", response);

        // Elimina el servicio de la base de datos
        await db.servicio.delete({ where: { id: servioId }});

        return NextResponse.json({ message: 'Servicio eliminado exitosamente' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el cliente';
        console.error(errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
