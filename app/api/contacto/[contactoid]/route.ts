import { db } from "@/lib/db";


export async function DELETE(req: Request) {
    const contactoid = new URL(req.url).pathname.split("/").pop();
    try {
        // Intentar eliminar el contacto
        const contacto = await db.contacto.delete({
            where: { id: contactoid },
        });

        // Verificar si el contacto fue encontrado y eliminado
        if (!contacto) {
            return new Response(JSON.stringify({ error: "Contacto no encontrado" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Contacto eliminado exitosamente" }), { status: 200 });
    } catch (error) {
        console.error(error instanceof Error ? error.message : "Error interno del servidor");
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
}
