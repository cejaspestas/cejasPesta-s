import { DataCliente } from "@/components/datacliente";

export const ClienteHome = () => {
    return (
        <div className="relative bg-bgprin text-textsecond p-8 overflow-hidden min-h-[110vh] md:min-h-[150vh] flex items-center justify-center border-b-2 border-white">
            {/* Contenedor principal */}
            <div className="relative z-10 w-full max-w-[1250px] flex flex-col items-center gap-8">
                {/* Título */}
                <div className="relative w-full flex flex-col md:flex-row justify-center items-center gap-6 text-center md:text-left">
                    <div className="relative">
                        <svg
                            viewBox="0 0 800 200"
                            className="w-[80vw] md:w-[60vw] lg:w-[50vw] absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20"
                        >
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-5xl md:text-4xl lg:text-5xl font-serif font-bold fill-none stroke-black stroke-2"
                            >
                                NUESTROS CLIENTES
                            </text>
                        </svg>
                        <h1 className="relative font-bold text-4xl sm:text-5xl md:text-6xl lg:text-5xl text-center z-30 font-serif">
                            Nuestros Clientes/Resultados
                        </h1>
                        <p className="relative text-black mt-4 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl leading-snug sm:leading-relaxed md:leading-loose font-mono text-center md:text-left">
                            Nos enorgullece contar con una increíble variedad de clientes que confían en nuestros servicios de cejas y pestañas. 
                            Cada uno de ellos busca realzar su belleza de forma única, y nos sentimos honrados de poder ofrecerles el mejor cuidado 
                            y atención para conseguir resultados impecables. Estos son algunos de nuestros maravillosos clientes, quienes han 
                            experimentado la transformación que solo nosotros podemos ofrecer.
                        </p>
                    </div>
                </div>

                {/* Contenedor de clientes */}
                <div className="relative z-10 p-5 w-full overflow-auto">
                    <DataCliente />
                </div>
            </div>
        </div>
    );
};
