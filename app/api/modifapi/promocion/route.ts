import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data) {
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }

        const { tipoServicio, descripcion, imagenes } = data;

        if (!tipoServicio || !descripcion ) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        const promocion = await db.promocion.create({
            data: {
                imagen: imagenes[0],
                tipoServicio: tipoServicio,
                descripcion: descripcion,
            }
        });

        if (!promocion) {
            return NextResponse.json({ error: 'Error al crear la promocion' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Promocion creada correctamente' }, { status: 200 });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'Error al crear la promocion';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
