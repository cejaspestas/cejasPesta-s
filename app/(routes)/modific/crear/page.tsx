"use client";

import { ClienteCrear } from "./components/clienteCrear";
import { EquipoCrear } from "./components/equipoCrear";
import { ImagenesBloque1 } from "./components/imagenesBloque1";
import { PrecioCrear } from "./components/precioCrear";
import { PromocionCrear } from "./components/promocionCrear";
import { ServiciosCrear } from "./components/serviicioscrear";
import { VideosCrear } from "./components/videoCrear";
import { useUser } from "@clerk/nextjs";

export default function Crear() {
    const { user } = useUser();

    if (user && user.primaryEmailAddress?.emailAddress !== "cejaspestaaaas343@gmail.com") {
        return <p className="text-white text-2xl font-bold" >No tienes Permiso</p>
    }

    if (!user) return null; 

    return (
        <div className="w-full min-h-[250vh] bg-[rgb(12,12,12)] text-white flex flex-col justify-center items-center py-10 px-5">
            <h1 className="text-4xl font-bold mb-10">Crear</h1>
            <div className=" bg-black p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                <PromocionCrear />
                <VideosCrear />
                <ServiciosCrear />
                <PrecioCrear />
                <EquipoCrear />
                <ImagenesBloque1 />
                <ClienteCrear />
            </div>
        </div>
    );
}
