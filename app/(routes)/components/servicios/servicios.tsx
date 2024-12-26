import { DataServicios } from "@/components/dataServicios";
import Link from "next/link";

export const ServiciosHome = () => {
    return (
        <div className="relative bg-bgprin overflow-hidden min-h-[300vh] sm:min-h-[250vh] md:min-h-[190vh] lg:min-h-[130vh] flex items-center justify-center border-b-2 border-bgsecond py-16 lg:py-20">
            <div className="w-[90%] h-full flex flex-col justify-center items-center gap-y-16 sm:gap-y-20 lg:gap-y-28">
                <div className="relative w-[93%] h-[25%] sm:h-[23%] md:h-[20%] lg:h-[18%] flex items-center justify-between flex-col md:flex-row">
                    
                    <div className="relative h-full flex flex-col items-center justify-center">
                        <svg
                            viewBox="0 0 800 200"
                            className="w-full h-[50%] sm:h-[45%] md:h-[40%] lg:h-[35%]"
                        >
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-[8rem] md:text-[8.5rem] lg:text-[9rem] font-bold fill-none stroke-black stroke-2 font-serif"
                            >
                                SERVICIOS
                            </text>
                        </svg>

                        <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold font-serif absolute text-textsecond">
                            Servicios
                        </h1>
                    </div>
                    <div className="relative w-full md:w-[50%] lg:w-[40%] h-full flex items-center justify-center md:justify-end mt-4 md:mt-0">
                        <Link
                            className="w-3/4 md:w-1/2 text-lg md:text-xl text-center font-bold font-serif bg-bgsecond hover:bg-texthover rounded-md text-textprin p-3"
                            href="/servicios"
                        >
                            Ver Servicios
                        </Link>
                    </div>
                </div>

                <div className="w-full h-[60%] sm:h-[65%] md:h-[70%] lg:h-[75%] overflow-auto lg:overflow-hidden">
                    <DataServicios count={3} />
                </div>
            </div>
        </div>
    );
};
