"use client";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { BarraProgreso } from '@/app/(routes)/sorteos/components/barraprogreso/barraprogreso';


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
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw" // Opcional para manejo responsivo
            />
            
            <div className="shadow-xl shadow-white absolute rounded-t-lg bottom-0 w-full h-[30%] bg-[rgb(30,30,30)] bg-opacity-85 flex flex-col items-center justify-center gap-y-3">
                <BarraProgreso productSorteo={productSorteo}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
}