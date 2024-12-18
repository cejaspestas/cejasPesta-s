"use client";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import Slider from "@/components/slider/slider";
import { ServiciosHome } from "./components/servicios/servicios";
import { VideosHome } from "./components/videos/videos";
import { ClienteHome } from "./components/clientes/cliente";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="relative h-[150vh] md:h-[120vh] w-full flex flex-col lg:flex-row items-center justify-center gap-8 p-5">
        {/* Imagen de fondo */}
        <Image
          src="/wer.webp"
          alt="wer"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
          width={1000}
          height={1000}
          priority
        />

        {/* Contenido principal */}
        <div className="relative z-10 h-auto w-full lg:w-1/3 flex flex-col items-center text-center lg:items-start lg:text-left gap-y-6 p-4 mt-10 md:mt-20">
          <h1 className="text-[6vh] md:text-[5vh] sm:text-[4vh] text-white font-bold font-serif leading-tight">
            Cejas y Pestañas Cúcuta
          </h1>
          <p className="text-white font-mono text-base md:text-lg lg:text-xl">
            Belleza, cosmética y cuidado personal
          </p>

          {/* Botón Contacto */}
          <div className="flex justify-center lg:justify-start">
            <Link href="https://wa.me/573112000000" target="_blank">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-sm md:text-base transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                <span className="font-mono">Contacta Con Nosotros</span>
              </button>
            </Link>
          </div>

          {/* Redes Sociales */}
          <div className="flex justify-center lg:justify-start items-center gap-x-6">
            <Link
              href="https://www.facebook.com/DUBRASKA.BARRIOS.MASTER"
              target="_blank"
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-slate-600 transition-transform transform hover:scale-110"
            >
              <FaFacebookF className="w-6 h-6 text-blue-600" />
            </Link>
            <Link
              href="https://wa.me/573148327958"
              target="_blank"
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-slate-600 transition-transform transform hover:scale-110"
            >
              <BsWhatsapp className="w-6 h-6 text-green-500" />
            </Link>
          </div>
        </div>

        {/* Slider */}
        <div className="relative z-10 w-full lg:w-2/5 h-[40vh] md:h-[65vh] rounded-md overflow-hidden shadow-lg mt-10 md:mt-0">
          <Slider />
        </div>
      </section>



      {/* Sección de Servicios */}
      <div className="px-4 py-8">
        <ServiciosHome />
      </div>

      {/* Sección de Videos */}
      <div className="px-4 py-8">
        <VideosHome />
      </div>

      {/* Sección de Clientes */}
      <div className="px-4 py-8">
        <ClienteHome />
      </div>
    </>
  );
}
