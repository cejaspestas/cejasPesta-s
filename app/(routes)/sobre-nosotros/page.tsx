"use client";

import Image from "next/image";

export default function SobreNosotros() {
    const handler = () => {
        window.location.href = "https://www.facebook.com/DUBRASKA.BARRIOS.MASTER";
    };

    return (
        <div className="min-h-[170vh] lg:min-h-[130vh] bg-bgprin flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-full p-8 gap-y-10">
                {/* Título */}
                <h1 className="text-5xl font-bold text-textsecond tracking-wide mb-6 text-center md:text-4xl sm:text-3xl font-serif">
                    Sobre Nosotros
                </h1>

                {/* Imagen del logo */}
                <div className="relative w-[30vh] h-[30vh] rounded-full boder-2 border-bgsecond flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <Image
                            src="/logo1.png"
                            alt="Logo"
                            className="w-full h-full absolute"
                            fill
                            priority
                        />
                    </div>
                </div>



                {/* Descripción */}
                <p className="text-lg text-center max-w-3xl text-textsecond leading-relaxed md:text-base md:max-w-xl sm:text-sm sm:max-w-md font-mono">
                    Bienvenido a nuestra página de Servicios. Estamos comprometidos en ofrecer las mejores soluciones para satisfacer tus necesidades. Nuestro equipo trabaja con pasión y dedicación para brindarte la calidad que mereces.
                </p>

                {/* Botón de llamada a la acción */}
                <button
                    onClick={handler}
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-bgtecer to-bghoverpara text-textprin rounded-lg text-lg font-semibold shadow-lg hover:from-texthover hover:to-bghoverpara transition-transform transform hover:scale-105 md:text-base md:px-6 md:py-2 sm:text-sm sm:px-4 sm:py-2"
                >
                    Conoce Más
                </button>
            </div>
        </div>
    );
}
