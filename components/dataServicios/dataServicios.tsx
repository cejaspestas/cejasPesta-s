"use client";
import { useEffect, useState } from "react";
import { Servicio } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const DataServicios = ({ count }: { count: number }) => {
    const { servicios } = useData() ?? {};
    const [isLoading, setIsLoading] = useState(true);
    const [serviciosdata, setServiciosData] = useState<Servicio[]>([]);

    useEffect(() => {
        if (servicios) {
            setServiciosData(servicios);
            setIsLoading(false);
        }
    }, [servicios]);

    if (isLoading) {
        return <div className="text-center text-gray-500">Cargando...</div>;
    }

    const ccc = count > serviciosdata.length ? serviciosdata.length : count;
    const countdataServices = serviciosdata.slice(0, ccc);

    return (
        <div className="relative w-[100%] md:w-[100%] lg:w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:gap-8 md:p-6 lg:p-8">
            {countdataServices.map((ele, i) => (
                <div
                    key={i}
                    className="group flex flex-col justify-center bg-bgsecond w-full h-full text-textprin p-5 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                >
                    <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-md mb-4">
                        <img
                            src={ele.imagenRuta}
                            alt={ele.titulo}
                            className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-transform duration-500 ease-in-out"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg md:text-base lg:text-lg font-bold mb-2 uppercase font-mono group-hover:text-texthover transition-colors duration-300">
                            {ele.titulo}
                        </h2>
                        <p className="text-sm md:text-xs lg:text-sm text-textprin capitalize font-mono leading-relaxed">
                            {ele.descripcion}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

