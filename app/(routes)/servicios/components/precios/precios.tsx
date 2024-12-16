"use client";
import { useEffect, useState } from "react";
import { Precio } from "@prisma/client";
import { useData } from "@/context/fetchdatos";


export const PreciosHome = () => {
  const [dataPrecios , setDataPrecios] = useState<Precio[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const  { precios } = useData() ?? {};
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
    <div className="relative bg-[rgb(12,12,12)] text-white p-8 overflow-hidden h-[280vh] md:h-[85vh] flex items-center justify-center border-b-2 border-white">
      {/* Contenedor principal */}
      <div className="relative z-10 w-[90%] h-[85%]">
        {/* Contenedor del título */}
        <div className="relative z-10 pl-3 flex flex-col md:flex-row justify-center gap-y-5 md:justify-between items-center w-full h-[20%]">
          <div className="relative text-center md:text-left">
            <span className="text-orange-500 font-bold text-sm block mb-2">02.</span>
            <svg
              viewBox="0 0 800 200"
              className="w-[160vh] absolute top-[8vh] left-[12vh] transform -translate-x-1/2 -translate-y-1/2 md:left-[20vh] md:top-[7vh]"
            >
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-3xl font-serifmd:text-5xl font-bold fill-none stroke-white stroke-2 opacity-20"
              >
                PRECIOS
              </text>
            </svg>
            <h1 className="relative font-bold font-serif text-3xl sm:text-5xl lg:text-6xl z-30">
              Precios
            </h1>
          </div>
        </div>

        {/* Contenedor de precios */}
        <div className="relative z-10 p-5 w-full h-[70%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataPrecios && dataPrecios.slice(0, 3).map((precio) => (
            <div
              key={precio.id}
              className="hover:bg-orange-600 hover:scale-[1.1] bg-[#1f1f1f] rounded-md shadow-md flex items-center justify-center h-full"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold font-mono">{precio.tipoServicio}</h2>
                <h3 className="text-lg font-mono font-bold">Precio: {precio.precio}</h3>
                <p className="text-lg font-mono">${precio.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
