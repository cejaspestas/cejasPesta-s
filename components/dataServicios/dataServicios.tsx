"use client";
import { useEffect, useState } from "react";
import { Servicio } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const DataServicios = ({ count }: { count: number }) => {
    const { servicios } = useData() ?? {}; // Destructure servicios directly from context
    const [isLoading, setIsLoading] = useState(true); // State for loading
    const [serviciosdata, setServiciosData] = useState<Servicio[]>([]); // Local state to store servicios

    useEffect(() => {
        if (servicios) {
            setServiciosData(servicios); // Set servicios data when available
            setIsLoading(false); // Set loading to false when data is loaded
        }
    }, [servicios]); // Trigger when servicios data is updated from context

    if (isLoading) {
        return <div className="text-center text-gray-500">Cargando...</div>;
    }

    const ccc = count > serviciosdata.length ? serviciosdata.length : count; // Ensure count doesn't exceed data length
    const countdataServices = serviciosdata.slice(0, ccc); // Slice the array to the required count

    return (
        <div className="relative w-[90%] md:w-[80%] lg:w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:gap-8 md:p-6 lg:p-8">
            {countdataServices.map((ele, i) => (
                <div
                    key={i}
                    className="group flex flex-col justify-between bg-bgsecond  w-full h-full text-textprin p-5 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                >
                    <div className="w-full h-[200px] sm:h-[250px] lg:h-[300px] overflow-hidden rounded-md mb-4">
                        <img
                            src={ele.imagenRuta}
                            alt={ele.titulo}
                            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-bold mb-2 uppercase font-mono group-hover:text-texthover transition-colors duration-300">
                            {ele.titulo}
                        </h2>
                        <p className="text-textprin text-sm capitalize font-mono leading-relaxed">
                            {ele.descripcion}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
