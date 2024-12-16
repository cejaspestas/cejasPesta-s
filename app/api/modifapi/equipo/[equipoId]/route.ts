import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN!, // Asegúrate de que el token de UploadThing esté correctamente configurado
});


export async function DELETE(request: Request) {
    try {

        const clienteId = request.url.split('/')[request.url.split('/').length - 1];
        
        const cliente = await db.equipo.findUnique({ where: { id: clienteId }});

        if (!cliente) {
            return NextResponse.json({ error: 'No se ha encontrado el cliente' }, { status: 404 });
        }
        
        const deleteImage = cliente.rutaImagen.split('/').pop();
        const response = await utapi.deleteFiles([deleteImage] as string[]);

        if (!response || !response.success) {
            console.error("Error al eliminar el archivo en UploadThing:");
        }


        await db.equipo.delete({ where: { id: clienteId }});

        return NextResponse.json({ message: 'ELIMINADO' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el cliente';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
