import Image from "next/image";

export default function SobreNosotros() {
    return (
        <div className="h-[115vh] bg-[rgb(12,12,12)]">
            <div className="flex flex-col items-center justify-center h-full p-8 bg-black bg-opacity-50 gap-y-10">
                <h1 className="text-4xl font-bold mb-4 text-white md:text-3xl sm:text-2xl font-serif">Sobre Nosotros</h1>
                <div className="rounded-full w-[35vh] h-[35vh] bg-white md:w-[25vh] md:h-[25vh] sm:w-[20vh] sm:h-[20vh]">
                    <Image src="/logo1.png" alt="Logo" width={10000} height={10000} className="w-full h-full rounded-full" />
                </div>
                <p className="text-lg text-center max-w-2xl text-white md:text-lg md:max-w-3xl sm:text-sm sm:max-w-md font-mono">
                    Bienvenido a nuestra página de Servicios. Estamos comprometidos en ofrecer las mejores soluciones para satisfacer tus necesidades. Nuestro equipo trabaja con pasión y dedicación para brindarte la calidad que mereces.
                </p>
            </div>
        </div>
    );
}
