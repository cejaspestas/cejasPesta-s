"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { useState, useEffect } from "react";;
import { Cliente } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const DataCliente = () => {
  const [dataClientes , setDataClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const { clientes } = useData() ?? {}

  useEffect(() => {
    if ( clientes ){
      setDataClientes(clientes);
      setIsLoading(false);
    }

  }, [clientes]);

  // Mostrar un mensaje de carga si los datos aún no están listos
  if (isLoading) {
      return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20} // Espaciado entre diapositivas
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="w-full h-full" // Altura y ancho del contenedor
      breakpoints={{
        // Configuraciones responsivas
        320: {
          slidesPerView: 1, // Una diapositiva para pantallas pequeñas
        },
        768: {
          slidesPerView: 2, // Dos diapositivas para pantallas medianas
        },
        1024: {
          slidesPerView: 3, // Tres diapositivas para pantallas grandes
        },
      }}
    >
      {dataClientes && dataClientes.map((image: Cliente) => (
        <SwiperSlide
          key={image.id}
          className="flex flex-col gap-4 items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 rounded-md shadow-lg"
        >
          <div className="relative w-full h-64">
            <Image
              src={image.rutaImagen}
              alt={image.nombre}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <h2 className="mt-4 text-lg font-bold font-mono text-center text-white">{image.nombre}</h2>
          <h3 className="text-sm text-gray-500 font-mono text-center">{image.tipoServicio}</h3>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
