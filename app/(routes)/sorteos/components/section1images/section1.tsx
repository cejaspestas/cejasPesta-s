"use client";
import { DetallesProd } from "../detallesprod/detallesProd";
import { FechasContador } from "../fecha/fecha";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useData } from "@/context/fetchdatos";
import { SliderSorteo } from "@/components/sliderSorteo/sliderSorteo";

export const Section1 = () => {
    const [productSorteo, setProductSorteo] = useState<Product[]>([]);
    const { productos } = useData() ?? {}

    useEffect(() => {
        if (productos) {
            setProductSorteo(productos);
        }
    }, [productos]);

    if (!productSorteo || productSorteo.length === 0) {
        return <div>Loading...</div>; // O cualquier mensaje adecuado
    }

    return (
        <>

            <section className=" relative p-5 w-[85%] min-h-[150vh] lg:h-[100vh] flex flex-col items-center justify-center">
                <div className="p-4 right-0 w-full h-auto flex flex-col items-center justify-center bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent rounded-lg shadow-md">
                    <h1 className="capitalize text-4xl lg:text-5xl font-serif text-white font-bold text-center drop-shadow-md">
                        {productSorteo[0]?.title}
                    </h1>
                    <h2 className="uppercase text-3xl lg:text-4xl font-mono text-yellow-400 font-bold text-center drop-shadow-md">
                        {new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                        }).format(Number(productSorteo[0]?.priceProduct))} COP
                    </h2>
                </div>

                <div className="bg-[rgb(12,12,12)] w-full h-full flex flex-col lg:flex-row justify-center items-center gap-y-10 lg:gap-x-10">
                    <div className="w-full h-[45%] lg:h-[75%] rounded-lg lg:w-[45%] flex flex-col items-center justify-center p-5 gap-y-2">
                        <div className="w-full h-[40%] flex flex-col items-center justify-center gap-y-5 p-5">
                            <h1 className="text-3xl lg:text-3xl font-bold font-serif text-center text-white">
                                🎉 ¡Participa en Nuestra Gran Rifa y Gana Sorprendentes Premios! 🎟️
                            </h1>
                            <p className="text-center font-mono text-base lg:text-lg text-white leading-6 lg:leading-8">
                                🎁 ¡No te pierdas esta oportunidad única! Participa en nuestra rifa y ten la posibilidad de ganar increíbles premios. 
                                Es muy fácil unirte: adquiere tu boleto, cruza los dedos y prepárate para ser uno de los afortunados ganadores. 
                                ¡Mientras más boletos compres, más oportunidades tendrás!
                            </p>
                        </div>
                        <DetallesProd productSorteo={productSorteo} />
                        <FechasContador/>
                    </div>

                    <div className="w-full h-[45%] lg:h-[90%] lg:w-[45%] flex flex-col items-center justify-between rounded-lg p-5">
                        <div className="relative w-full h-[90%] bg-black rounded-lg overflow-hidden mt-5 shadow-lg">
                            {productSorteo[0]?.ImagenRuta ? (
                                <SliderSorteo productSorteo={productSorteo} array={productSorteo[0].ImagenRuta}/>
                            ) : (
                                <div className="w-full h-full bg-gray-500 flex items-center justify-center">
                                    <span className="text-white">Imagen no disponible</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
