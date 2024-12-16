import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {

        const sortId = request.url.split('/')
        const idTotal = sortId[sortId.length - 1];

        await db.userInfo.delete({ where: { id:idTotal } });

        return NextResponse.json({ message: 'ELIMINADO' }, { status: 200 });
    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}