import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from 'fs/promises';


export async function DELETE(request: Request) {
    try {

        const clienteId = request.url.split('/')[request.url.split('/').length - 1];
        
        const cliente = await db.cliente.findUnique({ where: { id: Number(clienteId) }});

        if (!cliente) {
            return NextResponse.json({ error: 'No se ha encontrado el cliente' }, { status: 404 });
        }
        
        await fs.unlink(cliente.rutaImagen);

        await db.cliente.delete({ where: { id: Number(clienteId) }});

        return NextResponse.json({ message: 'POST' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el cliente';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
