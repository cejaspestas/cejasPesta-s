import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Lista de dominios permitidos
const domains = ["https://cejaspestaniascolombia.vercel.app"];

export async function GET(request: Request) {
    // Obtener el origen (dominio) de la solicitud
    const origin = request.headers.get("origin");

    // Verificar si el origen está en la lista de dominios permitidos
    if (!origin || !domains.includes(origin)) {
        return NextResponse.json(
            { error: "No autorizado. Tu dominio no está permitido." },
            { status: 403 }
        );
    }

    try {
        // Consultas a la base de datos
        const contactos = await db.contacto.findMany();
        const imagenes = await db.imagen.findMany();
        const servicios = await db.servicio.findMany();
        const videos = await db.video.findMany();
        const clientes = await db.cliente.findMany();
        const precios = await db.precio.findMany();
        const promociones = await db.promocion.findMany();
        const equipo = await db.equipo.findMany();
        const productos = await db.product.findMany();
        const dataUser = await db.userInfo.findMany();
        const fecha = await db.fecha.findMany();

        const datosDb = {
            contactos,
            imagenes,
            servicios,
            videos,
            clientes,
            precios,
            promociones,
            equipo,
            productos,
            dataUser,
            fecha
        };

        // Respuesta exitosa
        return NextResponse.json(
            { message: 'Datos recibidos correctamente', info: datosDb },
            { status: 200 }
        );
    } catch (error) {
        // Manejo de errores
        return NextResponse.json(
            { error: 'Error al recibir los datos', details: error },
            { status: 500 }
        );
    }
}
