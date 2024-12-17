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
      <section className="relative h-[160vh] md:h-[120vh] w-full flex items-center justify-center max-md:flex-col max-md:gap-y-10 gap-x-10">
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
        <div className="relative z-10 h-[60%] w-[30%] max-md:h-[30%] max-md:w-[70%] flex flex-col items-center justify-between p-5">
          <h1 className="text-[10vh] max-xl:text-[8vh] max-lg:text-[6vh] max-md:text-[4vh] text-white font-bold p-3 font-serif mr-4">
            Cejas y Pestañas Cucuta
          </h1>
          <p className="text-white font-mono text-xl lg:text-2xl mr-8"> Belleza, cosmética y cuidado personal </p>
          <div className="w-full flex items-center justify-center md:justify-start">
            <Link href="https://wa.me/573112000000">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg text-sm md:text-base transition duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                <span className="font-mono">Contacta Con Nosotros</span>
              </button>
            </Link>
          </div>

          <div className="ml-10 mt-5 w-full flex justify-start items-center gap-x-6">
            <div className="hover:bg-slate-600 rounded-full w-12 h-12 bg-white flex items-center justify-center transition-transform transform hover:scale-110">
              <Link
                href="https://www.facebook.com/DUBRASKA.BARRIOS.MASTER"
                target="_blank"
              >
                <FaFacebookF className="w-8 h-8 text-blue-600" />
              </Link>
            </div>
            <div className="hover:bg-slate-600 rounded-full w-12 h-12 bg-white flex items-center justify-center transition-transform transform hover:scale-110">
              <Link
                href="https://wa.me/573148327958"
                target="_blank"
              >
                <BsWhatsapp className="w-8 h-8 text-green-500" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative z-10 bg-red-50 h-[60%] w-[40%] max-md:h-[40%] max-md:w-[70%] rounded-sm overflow-hidden">
          <Slider />
        </div>
      </section>
      <ServiciosHome />
      <VideosHome />
      <ClienteHome />
    </>
  );
}
