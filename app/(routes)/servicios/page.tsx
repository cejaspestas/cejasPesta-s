"use client";
import { useState } from "react";
import { DataServicios } from "@/components/dataServicios";
import { PreciosHome } from "./components/precios";
import { PromocionesHome } from "./components/promociones/promociones";
import { TeamDisplay } from "./components/personal/personal";

export default function Servicios() {
  const [count, setCount] = useState(3);
  const maxCount = 15; // Suponiendo que tienes un máximo de 15 servicios.

  return (
    <>
      <div className="w-full min-h-[220vh] md:min-h-[150vh] bg-bgtecer flex justify-center items-start">
        <div className="w-[85%] min-h-[120vh] mt-[20vh] flex flex-col justify-between p-5 gap-y-5 md:gap-y-10">
          <h1 className="font-serif text-textprin text-3xl md:text-6xl text-center pt-5 font-bold">
            Servicios
          </h1>
          <p className="text-textprin text-center font-mono text-lg lg:text-2xl">
            En Cejas y Pestañas en Cúcuta nos especializamos en realzar tu belleza natural a través de servicios de micropigmentación de cejas, así como tratamientos especializados en belleza, cosmética y cuidado personal. Contamos con técnicas avanzadas y profesionales capacitados para brindarte resultados impecables y personalizados, adaptados a tus necesidades. Déjanos resaltar tu mirada y consentir tu piel con la atención que mereces. ¡Transforma tu imagen con nosotros y luce tu mejor versión! ✨
          </p>
          <div className="w-full min-h-[50vh] md:min-h-[70vh] flex justify-center items-center">
            <DataServicios count={count} />
          </div>
          <button
            aria-label="Mostrar más servicios"
            className={`bg-bgsecond hover:bg-texthover rounded-md text-textprin p-3 w-1/2 mx-auto mb-5 ${
              count >= maxCount ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setCount(count + 3)}
            disabled={count >= maxCount}
          >
            Ver más
          </button>
        </div>
      </div>
      <div className="w-full min-h-[100vh] lg:min-h-[180vh] bg-bgprin flex justify-center items-center flex-col gap-y-[5vh]">
        <div className="w-[85%]">
          <h1 className="text-textsecond text-3xl md:text-4xl text-center pt-5 font-bold font-serif">
            Promociones
          </h1>
        </div>
        <div className="w-[85%] min-h-[50vh] flex justify-center items-center">
          <PromocionesHome />
        </div>
      </div>

      <TeamDisplay />
    </>
  );
}
