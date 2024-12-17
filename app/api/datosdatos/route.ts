import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Lista de dominios permitidos (sin `/*`)

export async function GET(request: Request) {
    try {
        // Obtener solo el origen (dominio base) de la solicitud
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
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json(
            { error: 'Error al recibir los datos', details: errorMessage },
            { status: 500 }
        );
    }
}
