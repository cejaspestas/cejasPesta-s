"use client";
import { Progress } from "@/components/ui/progress";
import { Product, UserInfo } from "@prisma/client";
import { useEffect, useState } from "react";
import { useData } from "@/context/fetchdatos";

export const BarraProgreso = ({ productSorteo }: { productSorteo: Product[] }) => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]); // Corregir nombre de variable
  const [count, setCount] = useState(0);
  const { dataUser} = useData() ?? {}

  useEffect(() => {
    if  (dataUser) {
      setUserInfo(dataUser);
    }
  }, [dataUser]); // Ejecutar solo una vez al montar el componente

  useEffect(() => {
    // Calcular el conteo total basado en numerosEscogidos
    let total = 0;
    userInfo.forEach((element) => {
      if (element.numerosEscogidos) {
        const numerosEscogidos = element.numerosEscogidos.split(",");
        total += numerosEscogidos.length;
      }
    });
    setCount(total);
  }, [userInfo]); // Ejecutar cuando `userInfo` cambie

  if (!productSorteo.length) return null; // Verificar si hay productos

  const totalBoletos = Number(productSorteo[0]?.cantidadBoletonumeros); // Límite (evitar división por 0)
  const boletosVendidos = count; // Progreso actual

  const porcentajeProgreso = Math.min(
    (boletosVendidos / totalBoletos) * 100,
    100
  ); // Calcular porcentaje y limitar a 100%

  return (
    <>
      <small className="text-white text-xl text-center font-bold capitalize">
        Barra de Progreso
      </small>
      <Progress
        className="w-[80%] h-10 mx-auto bg-gray-300"
        value={porcentajeProgreso}
      />
      <h1 className="text-white text-xl text-center font-bold capitalize font-serif">
        {`${boletosVendidos} / ${totalBoletos} Numeros Vendidos`}
      </h1>
      <h2 className="text-orange-400 text-xl text-center font-bold capitalize">Valor del Boleto:   

      
        {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
        }).format(Number(productSorteo[0]?.priceBoleto))} COP 
      </h2>
    </>
  );
};
