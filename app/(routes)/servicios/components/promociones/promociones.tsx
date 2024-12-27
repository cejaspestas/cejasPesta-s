"use client";
import { useState, useEffect } from "react";
import { Promocion } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const PromocionesHome = () => {
  const [dataPromociones, setDataPromociones] = useState<Promocion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { promociones } = useData() ?? {};

  useEffect(() => {
    if (promociones) {
      setDataPromociones(promociones);
      setIsLoading(false);
    }
  }, [promociones]);

  if (isLoading) {
    return <div className="text-center text-gray-400 mt-8">Cargando...</div>;
  }

  if (!dataPromociones || dataPromociones.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-8">
        No hay promociones disponibles.
      </div>
    );
  }

  return (
    <div className="w-[90%] min-h-[80vh] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {dataPromociones.map((promo) => (
        <div
          key={promo.id}
          className="flex flex-col items-center hover:bg-texthover justify-center bg-bgsecond p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          {/* Mostrar imagen si está disponible */}
          {promo.imagen && (
            <img
              src={promo.imagen}
              alt={promo.tipoServicio}
              className="w-full h-1/1 object-scale-down mb-4 rounded-lg"
            />
          )}
          <h2 className=" text-lg sm:text-xl lg:text-2xl text-textprin capitalize font-mono mb-4 text-center">
            {promo.tipoServicio}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-textprin text-center font-mono leading-relaxed">
            {promo.descripcion}
          </p>
        </div>
      ))}
    </div>
  );
};

