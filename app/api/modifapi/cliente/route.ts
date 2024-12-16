import { NextResponse } from "next/server";
import { db } from "@/lib/db";



export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        if(!data) {
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }

        const {rutaImagen, nombre, tipoServicio} = data;

        if(!rutaImagen || !nombre || !tipoServicio) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }



        const cliente = await db.cliente.create({
            data: {
                rutaImagen: rutaImagen,
                nombre: nombre,
                tipoServicio: tipoServicio,
            }
        });

        if(!cliente) {
            return NextResponse.json({ error: 'Error al crear el cliente' }, { status: 500 });
        }

        return NextResponse.json({ message : 'Cliente creado correctamente' }, { status: 200 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al editar el cliente';
        return NextResponse.json({ error: errorMessage }, { status: 500 });        
    }
}
