"use client";
import { DataServicios } from "@/components/dataServicios";
import { useState } from "react";
import { PreciosHome } from "./components/precios";
import { PromocionesHome } from "./components/promociones/promociones";
import { TeamDisplay } from "./components/personal/personal";
export default function Servicios() {
  const [count, setCount] = useState(3);
  const maxCount = 15; // Suponiendo que tienes un máximo de 15 servicios.

  return (
    <>
        <div className="w-full min-h-[220vh] md:min-h-[150vh] bg-[rgb(12,12,12)] flex justify-center items-start">
            <div className="w-[85%] min-h-[120vh] mt-[20vh] flex flex-col justify-between p-5 gap-y-5 md:gap-y-10">
                <h1 className="font-serif text-white text-3xl md:text-6xl text-center pt-5 font-bold">
                    Servicios
                </h1>
                <p className="text-white text-center font-mono">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
                    ab molestias deserunt culpa nemo odio sed, ullam eum, fuga tenetur
                    dicta nam quam voluptatibus, eveniet voluptas neque placeat vel. Eum!
                </p>
                <div className="w-full min-h-[50vh] md:min-h-[70vh] flex">
                    <DataServicios count={count} />
                </div>
                <button
                    aria-label="Mostrar más servicios"
                    className={`bg-[#1f1f1f] hover:bg-[#131313] rounded-md  text-white p-3 w-1/2 mx-auto mb-5 ${
                        count >= maxCount ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setCount(count + 3)}
                    disabled={count >= maxCount}
                >
                    Ver más
                </button>
            </div>
        </div>
        <PreciosHome />
        <div className="w-full min-h-[90vh] md:min-h-[75vh] bg-[#000000] flex justify-center items-center flex-col gap-y-[7vh] ">
            <div className="w-[85%]">
                <h1 className="text-white text-3xl md:text-4xl text-center pt-5 font-bold font-serif">Promociones</h1>
            </div>
            <PromocionesHome/>
        </div>
        <TeamDisplay/>
    
    </>   
  );
}
