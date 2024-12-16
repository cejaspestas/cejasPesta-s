"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useState, useEffect } from "react";
import { Promocion } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const PromocionesHome = () => {
  const [dataPromociones , setDataPromociones] = useState<Promocion[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const { promociones } = useData() ?? {};
  useEffect(() => {
    if (promociones) {
      setDataPromociones(promociones);
      setIsLoading(false);
    }
  }, [promociones]);

  if (isLoading) {
      return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (!dataPromociones || dataPromociones.length === 0) {
    return <div className="text-center text-gray-500">No hay promociones disponibles.</div>;
  }

  return (
    <>
          <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={20} // Espaciado entre diapositivas
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              className="w-[90%] h-full" // Altura y ancho del contenedor
              breakpoints={{
                320: {
                  slidesPerView: 1, // Una diapositiva para pantallas pequeñas
                },
                768: {
                  slidesPerView: 1, // Dos diapositivas para pantallas medianas
                },
                1024: {
                  slidesPerView: 2, // Tres diapositivas para pantallas grandes
                },
              }}
            >
              {dataPromociones.map((promo) => (
                // agregar la imagen y titulo
                <SwiperSlide
                  key={promo.id}
                  className="flex flex-col items-center justify-center bg-[#1f1f1f] p-5 rounded-md shadow-lg"
                >
                  <h2 className="mt-4 text-lg font-bold font-mono text-white">{promo.tipoServicio}</h2>
                  <p className="text-sm text-gray-300 font-mono text-center">{promo.descripcion}</p>
                </SwiperSlide>
              ))}
          </Swiper>

    </>
  );
};
