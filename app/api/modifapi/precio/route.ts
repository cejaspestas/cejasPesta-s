import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if(!data) {
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }

        const {tipoServicio, descripcion, precio} = data;

        if(!tipoServicio || !descripcion || !precio) {
            
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });

        }

        const precioCreado = await db.precio.create({
            data: {
                
                tipoServicio: tipoServicio,
                descripcion: descripcion,
                precio: precio,

            }
        });

        if(!precioCreado) {

            return NextResponse.json({ error: 'Error al crear el precio' }, { status: 500 });

        }

        return NextResponse.json({ message : 'Precio creado correctamente' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al crear el precio';
        return NextResponse.json({ error: errorMessage }, { status: 500 });     
    }
}
