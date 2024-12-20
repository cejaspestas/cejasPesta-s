import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data) {
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }

        if (!data?.fFinal) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        await db.fecha.create({
            data: {
                fFinal: data?.fFinal,
            }
        });


        return NextResponse.json({ message: 'Fecha creada correctamente' }, { status: 200 });

    } catch (error) {
    
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.log(errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}