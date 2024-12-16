import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN!, // Asegúrate de que el token de UploadThing esté correctamente configurado
});



export async function DELETE(request: Request) {
    try {
        // Usamos una expresión regular para obtener el productId desde la URL
        const url = new URL(request.url);
        const pathname = url.pathname;
        const productIdMatch = pathname.match(/\/product\/(\d+)$/); // Busca el ID numérico al final de "/product/{id}"

        if (!productIdMatch) {
            return NextResponse.json({ error: 'Product ID not found in the URL' }, { status: 400 });
        }

        const productId = productIdMatch[1];

        // Obtenemos los detalles del producto de la base de datos
        const productImage = await db.product.findUnique({ where: { id: productId } });

        if (!productImage?.ImagenRuta) {
            return NextResponse.json({ error: 'Product not found or image path missing' }, { status: 404 });
        }

        const deleteImage = productImage.ImagenRuta.split('/').pop();
        const response = await utapi.deleteFiles([deleteImage] as string[]);

        if (!response || !response.success) {
            console.error("Error al eliminar el archivo en UploadThing:");
        }


        // Eliminamos el producto de la base de datos
        await db.product.delete({ where: { id: productId } });

        // Retornamos la respuesta de éxito
        return NextResponse.json({ message: 'Product and image deleted successfully' }, { status: 200 });

    } catch (error) {
        // Manejamos cualquier otro error
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.log(errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
