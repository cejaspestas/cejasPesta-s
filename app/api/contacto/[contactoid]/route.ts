import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req : Request , { params } : { params: { contactoid: string } }) {
    const { contactoid } = params;

    if (!contactoid) {
        return new Response(JSON.stringify({ error: "Falta el ID del contacto" }), { status: 400 });
    }

    try {
        const contacto = await db.contacto.findUnique({
            where: { id: Number(contactoid) },
        });

        if (!contacto) {
            return new Response(JSON.stringify({ error: "Contacto no encontrado" }), { status: 404 });
        }

        return new Response(JSON.stringify(contacto), { status: 200 });
    } catch (error) {
        console.error("Error al obtener el contacto:", error);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
}
