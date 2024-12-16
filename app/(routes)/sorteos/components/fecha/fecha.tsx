"use client";

import Countdown from "react-countdown";
import { useState, useEffect } from "react";
import { Fecha } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const FechasContador = () => {
  const [isClient, setIsClient] = useState(false);
  const [dataFecha, setDataFecha] = useState<Fecha[] | null>(null);
  const { fecha } = useData() ?? {}
  useEffect(() => {
    if  (fecha) {
      setDataFecha(fecha);
    }
    setIsClient(true);
  }, []);

  if (!isClient || !dataFecha || dataFecha.length === 0) {
    return null; // Evitar renderizar hasta tener datos
  }

  // Convertir las fechas a objetos Date
  const startDate = new Date(Date.now())
  const endDate = new Date(dataFecha[0].fFinal);

  return (
    <div className="flex flex-col items-center justify-center gap-y-5 w-full h-[20%] py-5">
      <div className="grid grid-cols-2 gap-5 grid-rows-2">
        <div className="flex items-center justify-center p-2">
          <h1 className="col-span-1 text-white font-mono">
            Fecha de inicio: {startDate.toLocaleString()}
          </h1>
        </div>
        <div className="flex items-center justify-center p-2">
          <h1 className="col-span-1 text-white font-mono">
            Fecha de finalización: {endDate.toDateString()}
          </h1>
        </div>
        <Countdown
          className="col-span-2 text-white text-center text-4xl font-mono bg-orange-600 p-5"
          date={endDate}
        />
      </div>
    </div>
  );
};
