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
  const  { imagenes } = useData() ?? {};
  useEffect(() => {
    if  (imagenes) {
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
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="flex items-center justify-center w-full h-full">
            <Image
              src={image.ruta}
              alt="Imagen"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw" // Opcional para manejo responsivo
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
