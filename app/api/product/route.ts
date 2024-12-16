import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function POST (request: Request) {
    try {
        const data = await request.json();
        if (!data) {
            return NextResponse.json({ error: 'No se han recibido datos' }, { status: 500 });
        }
        
        const { title, ImagenRuta, description, caracteristicas, priceProduct, cantidadBoletonumeros, priceBoleto } = data;

        if (!title || !ImagenRuta || !description || !caracteristicas || !priceProduct || !cantidadBoletonumeros || !priceBoleto) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }
        const parseIndt= parseInt(cantidadBoletonumeros);
        const product = await db.product.create({
            data: {
                
                title,
                ImagenRuta,
                description,
                caracteristicas,
                priceProduct,
                cantidadBoletonumeros: parseIndt,
                priceBoleto,
            }
        });
        
        if (!product) {
            return NextResponse.json({ error: 'Error al crear el producto' }, { status: 500 });
        }

        return NextResponse.json({ message: 'POST' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.log(errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}