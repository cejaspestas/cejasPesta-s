import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN!, // Asegúrate de que el token de UploadThing esté correctamente configurado
});

export async function DELETE(request: Request) {
  try {
    // Obtener el productId desde la URL
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Verificar la ruta completa recibida
    console.log("Request URL:", pathname);

    const productId = pathname.split("/").pop();

    if (!productId || productId === "undefined") {
      return NextResponse.json(
        { error: "Product ID not found in the URL" },
        { status: 400 }
      );
    }

    // Obtener detalles del producto de la base de datos
    const product = await db.product.findUnique({ where: { id: productId } });

    if (!product || !Array.isArray(product.ImagenRuta) || product.ImagenRuta.length === 0) {
      return NextResponse.json(
        { error: "Product not found or image paths missing" },
        { status: 404 }
      );
    }

    // Eliminar las imágenes asociadas en UploadThing
    const deleteResults = await Promise.all(
      product.ImagenRuta.map(async (path) => {
        try {
          const fileName = path.split("/").pop();
          if (!fileName) throw new Error("Invalid file path");
          const response = await utapi.deleteFiles([fileName]);
          if (!response || !response.success) {
            throw new Error(`Failed to delete image: ${fileName}`);
          }
          return { fileName, success: true };
        } catch (error) {
          console.error(`Error deleting image: ${error}`);
          return { fileName: path, success: false, error };
        }
      })
    );

    // Log errores de eliminación
    const failedDeletions = deleteResults.filter((result) => !result.success);
    if (failedDeletions.length > 0) {
      console.error(
        "Some images could not be deleted:",
        failedDeletions.map((res) => res.fileName)
      );
    }

    // Eliminar el producto de la base de datos
    await db.product.delete({ where: { id: productId } });

    // Responder con éxito
    return NextResponse.json(
      {
        message: "Product and associated images deleted successfully",
        failedDeletions,
      },
      { status: 200 }
    );
  } catch (error) {
    // Manejo de errores generales
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
