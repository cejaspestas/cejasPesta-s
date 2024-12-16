import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data) {
            
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }

        const { imagenRuta , titulo, descripcion} = data;

        if (!imagenRuta || !titulo || !descripcion) {
            
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        const servicio = await db.servicio.create({
            data: {
                imagenRuta: imagenRuta,
                titulo: titulo,
                descripcion: descripcion,
            }
        });

        if (!servicio) {

            return NextResponse.json({ error: 'Error al crear el servicio' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Servicio creado correctamente' }, { status: 200 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al crear el servicio';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
