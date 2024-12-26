"use client";
import { useEffect, useState } from "react";
import { Product, UserInfo } from "@prisma/client";
import { Botondepago } from "./components/botondepago";
import { useData } from "@/context/fetchdatos";

export const Section2 = () => {
  const [numerosEscogidos, setNumerosEscogidos] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [productSorteo, setProductSorteo] = useState<Product[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const { productos, dataUser } = useData() ?? {};

  // Generar números del 0001 al 10000
  const numeros = Array.from({ length: Number(productSorteo[0]?.cantidadBoletonumeros) ?? 10000  }, (_, i) =>
    String(i + 1).padStart(4, "0")
  );

  // Extraer números ya escogidos por otros usuarios
  const numerosReservados = userInfo.flatMap((user) =>
    user.numerosEscogidos ? user.numerosEscogidos.split(",") : []
  );

  useEffect(() => {
    if (productos || dataUser) {
      setProductSorteo(productos ?? []);
      setUserInfo(dataUser ?? []);
    }
  }, [productos, dataUser]);

  // Manejar clic en un número
  const handleNumberClick = (number: string) => {
    // Verificar si el número está reservado
    if (numerosReservados.includes(number)) {
      setMessage(`El número ${number} ya está reservado.`);
      return;
    }

    // Agregar o quitar el número del estado
    setMessage(""); // Limpiar mensajes previos
    setNumerosEscogidos((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number) // Eliminar si ya estaba seleccionado
        : [...prev, number] // Agregar si no estaba seleccionado
    );
  };

  return (
      <section className="w-[90%] lg:w-[83%] h-auto bg-gray-950  flex flex-col items-center justify-center gap-10 py-10 px-4 rounded-lg shadow-xl">
        <h2 className="text-white text-2xl lg:text-4xl text-center font-bold font-serif">
          Selección de Números
        </h2>
        {message && <p className="text-red-500 text-center text-lg">{message}</p>}
        
        <div className="w-full h-[75%] flex flex-col items-center justify-center rounded-lg shadow-lg border border-gray-600 overflow-auto">
          <div className="w-full h-[75%] grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-6 overflow-auto p-4">
            {numeros.map((num) => {
              const isSelected = numerosEscogidos.includes(num);
              const isReserved = numerosReservados.includes(num);

              return (
                <div
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className={`w-full h-[130px] flex items-center justify-center text-white text-2xl font-bold rounded-lg shadow-md transition-transform duration-300 ${
                    isReserved
                      ? "bg-red-600 cursor-not-allowed"
                      : isSelected
                      ? "bg-orange-500"
                      : "bg-gray-600 hover:bg-orange-500 cursor-pointer"
                  } hover:scale-105`}>
                  {num}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full mt-6 flex justify-center">
          <Botondepago
            numerosEscogidos={numerosEscogidos}
            productSorteo={productSorteo}
          />
        </div>
      </section>

  );
};
