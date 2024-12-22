import { DataServicios } from "@/components/dataServicios";
import Link from "next/link";

export const ServiciosHome = () => {
    return (
        <div className="relative bg-bgprin overflow-hidden min-h-[120vh] md:h-[120vh] lg:min-h-screen flex items-center justify-center border-b-2 border-bgsecond">
            <div className="w-[90%] md:w-[85%] lg:w-[80%] h-full flex flex-col justify-center items-center">
                <div className="relative w-full h-[30%] md:h-[25%] lg:h-[20%] flex items-center justify-between flex-col md:flex-row">
                    
                    <div className="relative h-full flex flex-col items-center justify-center">
                        <svg
                            viewBox="0 0 800 200"
                            className="w-full h-[60%] md:h-[50%] lg:h-[40%]"
                        >
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-[8rem] md:mt-5 md:text-[9rem] lg:text-[10rem] xl:text-[10rem] font-bold fill-none stroke-black stroke-2 font-serif"
                            >
                                SERVICIOS
                            </text>
                        </svg>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif absolute text-textsecond">
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

                <div className="w-full h-[70%] md:h-[75%] lg:h-[80%] overflow-auto lg:overflow-hidden">
                    <DataServicios count={3} />
                </div>
            </div>
        </div>
    );
};
