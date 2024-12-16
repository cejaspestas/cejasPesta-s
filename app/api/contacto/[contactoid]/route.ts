import { db } from "@/lib/db";


export async function POST(req: Request, context: { params: any }) {
    const { contactoid } = context.params;
    console.log(req ? "d" : "");

    // Verificar si el ID está presente y es válido
    if (!contactoid || isNaN(Number(contactoid))) {
        return new Response(JSON.stringify({ error: "ID de contacto inválido" }), { status: 400 });
    }

    try {
        // Intentar eliminar el contacto
        const contacto = await db.contacto.delete({
            where: { id: Number(contactoid) },
        });

        // Verificar si el contacto fue encontrado y eliminado
        if (!contacto) {
            return new Response(JSON.stringify({ error: "Contacto no encontrado" }), { status: 404 });
        }

        return new Response(JSON.stringify(contacto), { status: 200 });
    } catch (error) {
        console.error("Error al eliminar el contacto:", error);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
}
