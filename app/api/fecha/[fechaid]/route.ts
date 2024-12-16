import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        // Usamos una expresión regular para obtener el productId desde la URL
        const url = new URL(request.url);
        const pathname = url.pathname;
        const productIdMatch =  pathname.split("/")[pathname.split("/").length - 1];
        if (!productIdMatch) {
            return NextResponse.json({ error: 'Product ID not found in the URL' }, { status: 400 });
        }
        const productId = Number(productIdMatch);
        await db.fecha.delete({ where: { id: productId } });

        return NextResponse.json({ message: 'Product and image deleted successfully' }, { status: 200 });

    } catch (error) {
        // Manejamos cualquier otro error
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.log(errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
