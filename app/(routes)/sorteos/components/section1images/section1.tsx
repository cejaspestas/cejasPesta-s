"use client";
import { DetallesProd } from "../detallesprod/detallesProd";
import { FechasContador } from "../fecha/fecha";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useData } from "@/context/fetchdatos";
import { SliderSorteo } from "@/components/sliderSorteo/sliderSorteo";
import { BarraProgreso } from "../barraprogreso/barraprogreso";

export const Section1 = () => {
    const [productSorteo, setProductSorteo] = useState<Product[]>([]);
    const { productos } = useData() ?? {};

    useEffect(() => {
        if (productos) {
            setProductSorteo(productos);
        }
    }, [productos]);

    if (!productSorteo || productSorteo.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <section className="relative p-4 w-[95%] sm:w-[90%] lg:w-[85%] min-h-screen lg:h-[120vh] flex flex-col items-center justify-center mx-auto gap-y-5 ">
            <h1 className="text-lg sm:text-xl lg:text-3xl font-serif text-white font-bold drop-shadow-xl">🎉 ¡Participa en Nuestra Gran Rifa y Gana Sorprendentes Premios! 🎟️ </h1>
            <div className="bg-[rgb(18,18,18)] min-h-[100vh] w-full flex flex-col lg:flex-row justify-center items-center gap-y-5 lg:gap-x-5 mt-5 lg:mt-0 p-5 rounded-lg shadow-xl">
                {/* Sección de texto */}
                <div className="w-full lg:w-[50%] flex flex-col items-center gap-y-6 p-6 rounded-lg">
                    <div className="p-4 w-full text-center rounded-lg shadow-md ">
                        <h1 className="capitalize text-2xl sm:text-3xl lg:text-5xl font-serif text-white font-bold drop-shadow-xl">
                            {productSorteo[0]?.title}
                        </h1>
                        <h2 className="uppercase text-xl sm:text-2xl lg:text-4xl font-mono text-yellow-400 font-bold drop-shadow-md mt-2">
                            {new Intl.NumberFormat('es-CO', {
                                style: "currency",
                                currency: "COP",
                            }).format(Number(productSorteo[0]?.priceProduct))} {" "}
                            COP
                        </h2>
                    </div>
                    <DetallesProd productSorteo={productSorteo} />
                    <FechasContador />
                    <BarraProgreso productSorteo={productSorteo} />
                </div>

                {/* Sección de imagen */}
                <div className="w-full lg:w-[50%] h-[300px] sm:h-[400px] lg:h-[85%] flex items-center justify-center p-3">
                    <div className="relative w-full h-full bg-gray-800 rounded-lg shadow-lg">
                        {productSorteo[0]?.ImagenRuta ? (
                            <SliderSorteo  array={productSorteo[0].ImagenRuta} />
                        ) : (
                            <div className="w-full h-full bg-gray-500 flex items-center justify-center rounded-lg">
                                <span className="text-white">Imagen no disponible</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
