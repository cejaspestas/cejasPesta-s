"use client";

import Countdown from "react-countdown";
import { useState, useEffect } from "react";
import { Fecha } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const FechasContador = () => {
  const [isClient, setIsClient] = useState(false);
  const [dataFecha, setDataFecha] = useState<Fecha[] | null>(null);
  const { fecha } = useData() ?? {};

  useEffect(() => {
    if (fecha) setDataFecha(fecha);
    setIsClient(true);
  }, [fecha]);

  if (!isClient || !dataFecha?.length) return null;

  const startDate = new Date();
  const endDate = new Date(dataFecha[0].fFinal);

  return (
    <div className="flex flex-col items-center gap-3 w-full py-4 bg-gray-900 rounded-md shadow-md">
      <h1 className="text-sm lg:text-base text-orange-500 font-semibold">
        Fecha de inicio: <span className="text-white">{startDate.toLocaleDateString()}</span>
      </h1>
      <h1 className="text-sm lg:text-base text-orange-500 font-semibold">
        Finalización: <span className="text-white">{endDate.toDateString()}</span>
      </h1>
      <Countdown
        className="text-2xl lg:text-4xl font-bold text-white bg-orange-600 px-6 py-3 rounded-lg shadow-md"
        date={endDate}
      />
    </div>
  );
};
