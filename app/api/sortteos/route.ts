import { NextResponse } from "next/server";
import { db } from "@/lib/db"


export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log(data);
        if (!data) {
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }

        const { nombreCompleto, email, celular, pais, numerosEscogidos } = data;
        console.log(nombreCompleto, email, celular, pais, numerosEscogidos);
        if (!nombreCompleto || !email || !celular || !pais || !numerosEscogidos) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        await db.userInfo.create({
            data: {
                nombreCompleto: nombreCompleto,
                email: email,
                celular: celular,
                pais: pais,
                numerosEscogidos: numerosEscogidos
            }
        })
        console.log('Sorteo creado correctamente');
        return NextResponse.json({ message: 'Sorteo creado correctamente' }, { status: 200 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

