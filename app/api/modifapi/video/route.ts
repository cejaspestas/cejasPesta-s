import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const data = await request.json();  

        if(!data) {
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }

        const {videoRuta , titulo, descripcion} = data;

        if(!videoRuta || !titulo || !descripcion) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        const video = await db.video.create({
            data: {
                videoRuta: videoRuta,
                titulo: titulo,
                descripcion: descripcion,
            }

        })

        if(!video) {
            return NextResponse.json({ error: 'Error al crear el video' }, { status: 500 });
        }

        return NextResponse.json({ message : 'Video creado correctamente' }, { status: 200 });
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al crear el video';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
        
    }
}

