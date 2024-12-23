"use client";
import { useEffect, useState } from "react";
import { Precio } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const PreciosHome = () => {
  const [dataPrecios, setDataPrecios] = useState<Precio[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const { precios } = useData() ?? {};

  useEffect(() => {
    if (precios) {
      setDataPrecios(precios);
      setIsLoading(false);
    }
  }, [precios]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="relative bg-bgprin border-t-2 text-textsecond p-8 overflow-hidden h-auto md:h-[100vh] flex items-center justify-center border-b-2 border-textprin">
      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-6xl h-full flex flex-col">
        {/* Contenedor del título */}
        <div className="relative z-10 pl-3 flex flex-col md:flex-row justify-center gap-y-5 md:justify-between items-center w-full mb-8">
          <div className="relative text-center md:text-left">
            <span className="text-texthover font-bold text-sm block mb-2">02.</span>
            <svg
              viewBox="0 0 800 200"
              className="w-full max-w-4xl absolute top-[8vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-[20vh] md:top-[7vh]"
            >
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-3xl md:text-5xl font-serif font-bold fill-none stroke-black stroke-2 opacity-20"
              >
                PRECIOS
              </text>
            </svg>
            <h1 className="relative font-bold font-serif text-2xl sm:text-4xl lg:text-5xl z-30">
              Precios
            </h1>
          </div>
        </div>

        {/* Contenedor de precios con scroll */}
        <div className="relative z-10 p-5 w-full h-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataPrecios &&
            dataPrecios.map((precio) => (
              <div
                key={precio.id}
                className="hover:bg-texthover hover:scale-105 transition-all bg-bgsecond rounded-md shadow-lg flex flex-col items-center justify-center p-6 h-full hover:shadow-xl"
              >
                <h2 className="text-xl font-bold font-mono mb-2 text-center text-textprin">{precio.tipoServicio}</h2>
                <h3 className="text-lg font-mono font-bold mb-1 text-center text-textprin">
                  Precio: {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(precio.precio)} COP
                </h3>
                <p className="text-sm md:text-base font-mono text-gray-300 text-center">
                  {precio.descripcion}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
