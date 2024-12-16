import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        if(!data) {
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }

        const {rutaImagen, cargo} = data;

        if(!rutaImagen || !cargo) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        const equipo = await db.equipo.create({
            data: {
                rutaImagen: rutaImagen,
                cargo: cargo,
            }
        });

        if(!equipo) {
            return NextResponse.json({ error: 'Error al crear el equipo' }, { status: 500 });
        }

        return NextResponse.json({ message : 'Equipo creado correctamente' }, { status: 200 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al crear el equipo';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
