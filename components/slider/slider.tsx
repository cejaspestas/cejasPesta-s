"use client";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { Imagen } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useData } from '@/context/fetchdatos';

export default function Slider() {
  const [images, setImages] = useState<Imagen[]>([]);
  const { imagenes } = useData() ?? {};

  useEffect(() => {
    if (imagenes) {
      setImages(imagenes);
    }
  }, [imagenes]);

  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0} // Sin espacio entre diapositivas
        slidesPerView={1} // Mostrar solo una imagen por diapositiva
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 3000, // 3 segundos entre diapositivas
          disableOnInteraction: false, // Sigue reproduciendo incluso si el usuario interactúa
        }}
        className="w-full h-full"
        loop={true} // Habilitar loop para que las imágenes se repitan
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="flex items-center justify-center w-full h-full">
            <div className="w-full h-full relative group">
              <Image
                src={image.ruta}
                alt="Imagen"
                fill
                className="object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, 50vw" // Opcional para manejo responsivo
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 transition-opacity duration-500 group-hover:opacity-0"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
