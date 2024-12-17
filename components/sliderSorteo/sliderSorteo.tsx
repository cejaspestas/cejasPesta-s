"use client";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { Product } from '@prisma/client';

export function SliderSorteo( {array , productSorteo } : {array: string[] , productSorteo: Product[]} ) {
    return (
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
        {array.map((image, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center w-full h-full">
            <Image
              src={image}
              alt="Imagen"
              fill
              className="object-cover h-full    w-full"
              sizes="(max-width: 768px) 100vw, 50vw" // Opcional para manejo responsivo
            />
          </SwiperSlide>
        ))}
      </Swiper>
    )
}