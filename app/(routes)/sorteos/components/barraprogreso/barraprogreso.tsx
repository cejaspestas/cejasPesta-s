"use client";

import { Progress } from "@/components/ui/progress";
import { Product, UserInfo } from "@prisma/client";
import { useEffect, useState } from "react";
import { useData } from "@/context/fetchdatos";

export const BarraProgreso = ({ productSorteo }: { productSorteo: Product[] }) => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [count, setCount] = useState(0);
  const { dataUser } = useData() ?? {};

  useEffect(() => {
    if (dataUser) setUserInfo(dataUser);
  }, [dataUser]);

  useEffect(() => {
    const total = userInfo.reduce((acc, user) => {
      const numeros = user.numerosEscogidos?.split(",") || [];
      return acc + numeros.length;
    }, 0);
    setCount(total);
  }, [userInfo]);

  if (!productSorteo.length) return null;

  const totalBoletos = Number(productSorteo[0]?.cantidadBoletonumeros) || 1;
  const boletosVendidos = count;
  const porcentajeProgreso = Math.min((boletosVendidos / totalBoletos) * 100, 100);
  const precioBoleto = productSorteo[0]?.priceBoleto;

  return (
    <div className="w-full flex flex-col items-center gap-2 py-4 bg-gray-900 rounded-md shadow-md">
      <h1 className="text-white text-base md:text-lg font-semibold">
        {`${boletosVendidos} / ${totalBoletos} Números Vendidos`}
      </h1>
      <Progress className="w-[90%] h-6 bg-gray-300" value={porcentajeProgreso} />
      <h2 className="text-orange-400 text-sm md:text-lg font-semibold">
        Valor del Boleto:{" "}
        {new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(Number(precioBoleto))}{" "}
        COP
      </h2>
    </div>
  );
};
