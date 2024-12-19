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
        <div className="relative w-[90%] h-[35%] md:h-[50%] lg:w-full lg:h-[85%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-[repeat(auto-fill,minmax(1fr))] gap-4 p-5">
            {countdataServices.map((ele, i) => (
                <div
                    key={i}
                    className="hover:bg-orange-600 hover:scale-[1.05] flex flex-col justify-start items-start bg-gradient-to-b from-gray-900 to-gray-950 w-full h-full text-white p-5 rounded-md shadow-md hover:shadow-lg transition-transform duration-300"
                >
                    <img
                        src={ele.imagenRuta}
                        alt={ele.titulo}
                        className="w-full h-[50%] object-cover rounded-md mb-4"
                    />
                    <h2 className="text-lg font-bold mb-2 text-center uppercase font-mono">{ele.titulo}</h2>
                    <p className="text-gray-400 text-sm text-center capitalize font-mono ">{ele.descripcion}</p>
                </div>
            ))}
        </div>
    );
};
