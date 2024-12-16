import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        // Extraer el ID desde la URL
        const url = new URL(req.url);
        const contactoid = url.pathname.split("/").pop(); // Obtiene la última parte de la ruta

        // Validar que el ID es válido
        const id = Number(contactoid);
        if (!id || isNaN(id)) {
            return new Response(JSON.stringify({ error: "ID de contacto inválido" }), { status: 400 });
        }

        // Intentar eliminar el contacto
        const contacto = await db.contacto.delete({
            where: { id },
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
