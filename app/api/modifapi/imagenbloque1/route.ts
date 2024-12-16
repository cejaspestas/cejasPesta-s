import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log(data, "1111111111");

        if (!data) {
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }

        const { rutaImagen} = data;
        console.log(rutaImagen, "2222222222");
        if (!rutaImagen || typeof rutaImagen !== 'string') {
            return NextResponse.json({ error: 'El campo rutaImagen es obligatorio y debe ser un string' }, { status: 400 });
        }

        const imagenbloque1 = await db.imagen.create({
            data: {
                ruta: rutaImagen,
            },
        });

        if (!imagenbloque1) {
            return NextResponse.json({ error: 'Error al crear la imagen del bloque 1' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Imagen del bloque 1 creada correctamente' }, { status: 200 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.log(errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}


