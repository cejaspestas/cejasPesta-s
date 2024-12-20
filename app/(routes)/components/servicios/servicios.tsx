import { DataServicios } from "@/components/dataServicios";
import Link from "next/link";

export const ServiciosHome = () => {
    return (
        <div className="relative  bg-gradient-to-b from-gray-950 to-black overflow-hidden h-[190vh] md:h-[150vh] lg:h-[100vh] flex items-center justify-center border-b-2 border-white">
            <div className="w-[90%] md:w-[85%] lg:w-[80%] h-[90%] md:h-[85%] lg:h-[80%] flex flex-col justify-center items-center ">
                <div className="relative w-full h-[25%] md:h-[20%] flex items-center justify-between flex-col md:flex-row">
                    
                    <div className="relative h-full flex flex-col items-center justify-center">
                        <svg
                            viewBox="0 0 800 200"
                            className="w-full h-[60%] md:h-[50%]"
                        >
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-[8rem] md:mt-5 md:text-[9rem] lg:text-[10rem] xl:text-[10rem] font-bold fill-none stroke-white stroke-2 font-serif"
                            >
                                SERVICIOS
                            </text>
                        </svg>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif absolute text-white">
                            Servicios
                        </h1>
                    </div>
                    <div className="relative w-full md:w-[50%] lg:w-[40%] h-full flex items-center justify-center md:justify-end mt-4 md:mt-0">
                        <Link
                            className="w-3/4 md:w-1/2 text-lg md:text-xl text-center font-bold font-serif bg-[#050505] hover:bg-[#131313] rounded-md text-white p-3"
                            href="/servicios"
                        >
                            Ver Servicios
                        </Link>
                    </div>
                </div>

                <div className="w-[100%] h-[80%]">
                    {
                        <DataServicios count={3} />
                    }
                </div>
            </div>
        </div>
    );
};
