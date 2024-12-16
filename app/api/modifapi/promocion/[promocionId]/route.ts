import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export async function DELETE(request: Request) {
    try {

        const promocionId = request.url.split('/')[request.url.split('/').length - 1];
        
        await db.promocion.delete({ where: { id: Number(promocionId) }});

        return NextResponse.json({ message: 'ELIMINADO' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el cliente';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
