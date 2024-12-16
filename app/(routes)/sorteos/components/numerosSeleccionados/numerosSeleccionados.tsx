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
    <section className="w-[83%] h-[300vh] bg-[rgb(12,12,12)] flex flex-col items-center justify-center gap-y-10 py-10">
      <h2 className="text-white text-xl lg:text-3xl text-center font-bold font-serif pt-5">
        Selección de Números
      </h2>
      {message && <p className="text-red-500">{message}</p>}
      <div className="bg-[rgb(30,30,30)] h-[80%] flex flex-col items-center justify-center rounded-lg w-[95%]">
        <div className="w-full h-full grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 overflow-auto p-4">
          {numeros.map((num) => {
            const isSelected = numerosEscogidos.includes(num);
            const isReserved = numerosReservados.includes(num);

            return (
              <div
                key={num}
                onClick={() => handleNumberClick(num)}
                className={`w-full h-[120px] ${
                  isReserved
                    ? "bg-red-500 cursor-not-allowed" // Números reservados
                    : isSelected
                    ? "bg-orange-500"
                    : "bg-[rgb(50,50,50)]"
                } text-white text-xl lg:text-2xl font-bold flex items-center justify-center rounded-lg shadow-md hover:scale-105 transition-transform duration-200 ${
                  !isReserved ? "hover:bg-orange-600 cursor-pointer" : ""
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[90%]">
        <Botondepago
          numerosEscogidos={numerosEscogidos}
          productSorteo={productSorteo}
        />
      </div>
    </section>
  );
};
