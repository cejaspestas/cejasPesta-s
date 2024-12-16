import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validar que los campos necesarios estén presentes
        if (!data.email || !data.mensaje || !data.nombre || !data.telefono) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        // Crear el contacto en la base de datos
        const contacto = await db.contacto.create({
            data: {
                email: data.email,
                nombre: data.nombre,
                telefono: data.telefono,
                mensaje: data.mensaje,
            },
        });

        if (!contacto) {
            return NextResponse.json({ error: "Error al crear el contacto" }, { status: 500 });
        }

        return NextResponse.json({ contacto }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error ? "Error al crear el contacto" : ""}, { status: 500 });
    }
}
