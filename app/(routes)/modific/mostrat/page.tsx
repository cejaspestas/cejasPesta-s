"use client";
import { Cliente, Contacto, Equipo, Imagen, Precio, Promocion, Servicio, Video } from "@prisma/client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useData } from "@/context/fetchdatos";

import { useUser } from "@clerk/nextjs"
export default function MostrarEditar() { 
    const [videos, setVideos] = useState<Video[]>([]);
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [precios, setPrecios] = useState<Precio[]>([]);
    const [promociones, setPromociones] = useState<Promocion[]>([]);
    const [equipo, setEquipo] = useState<Equipo[]>([]);
    const [imagenes, setImagenes] = useState<Imagen[]>([]);
    const [contactos, setContactos] = useState<Contacto[]>([]);
    const { contactos: c  , imagenes : i , servicios: s, videos: v, clientes: cl , precios: p, promociones: pr , equipo: e , } = useData() ?? {}
    const router = useRouter();

    useEffect(() => {
        console.log(c, i, s, v, cl, p, pr, e);  // Verificar los datos antes de asignarlos
      
        if (c && i && s && v && cl && p && pr && e) {
          setContactos(c);
          setImagenes(i);
          setServicios(s);
          setVideos(v);
          setClientes(cl);
          setPrecios(p);
          setPromociones(pr);
          setEquipo(e);
        }
    }, [c, i, s, v, cl, p, pr, e]);
      


    const EliminarVideo = async (id: number) => {
        try {
            const response = await fetch(`/api/modifapi/video/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el video");
            }
            router.refresh();

        } catch (error) {
            console.error("Error al eliminar el video:");
        }
    }

    const EliminarServicio = async (id: number) => {
        try {
            
            const response = await fetch(`/api/modifapi/servicios/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el servicio");
            }
            router.refresh();

        } catch (error) {
            console.error("Error al eliminar el servicio:");
        }
        
    }

    const EliminarPrecio = async (id: number) => {
        try {
            
            const response = await fetch(`/api/modifapi/precio/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el precio");
            }

            router.refresh();
        } catch (error) {
            console.error("Error al eliminar el precio:");
        }
    }

    const EliminarPromocion = async (id: number) => {
        try {
            
            const response = await fetch(`/api/modifapi/promocion/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la promocion");
            }

            router.refresh();

        } catch (error) {
            console.error("Error al eliminar la promocion:");
        }
    }

    const EliminarEquipo = async (id: number) => {
        try {
            
            const response = await fetch(`/api/modifapi/equipo/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el equipo");
            }

            router.refresh();
        } catch (error) {
            console.error("Error al eliminar el equipo:");
        }
    }

    const EliminarImagen = async (id: number) => {

        try {
             
            const response = await fetch(`/api/modifapi/imagenbloque1/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la imagen");
            }
            router.refresh();
        } catch (error) {
            console.error("Error al eliminar la imagen:");        
        }
    }

    const EliminarContacto = async (id: number) => {
        try {
            
            const response = await fetch(`/api/contacto/${id}`, {

                method: "DELETE"
            });

            if (!response.ok) {

                throw new Error("Error al eliminar el contacto");
            }

            router.refresh();
        } catch (error) {
            console.error("Error al eliminar el contacto:");
        }
    }

    const EliminarCliente = async (id: number) => {
        try {
            const response = await fetch(`/api/modifapi/cliente/${id}`, {
                
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el cliente");
            }

            router.refresh();

        } catch (error) {
            console.error("Error al eliminar el cliente:");
        }
    }

    const { user } = useUser();
    if (user) {
        if(user.primaryEmailAddress?.emailAddress !== "cejaspestaaaas343@gmail.com"){
            return redirect("/modific")
        }
    }
    if(!user) return redirect("/modific")


    return (
        <div className="w-full min-h-[260vh] bg-[rgb(12,12,12)] text-white flex flex-col justify-center items-center py-10 px-5">
            <div className="w-[90%] p-5 rounded-lg bg-[rgb(29,28,28)] overflow-y-scroll">
                <h2 className="text-4xl font-bold mb-10 text-center">Mostrar Videos</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Título</th>
                            <th className="border border-gray-300 px-4 py-2">Descripción</th>
                            <th className="border border-gray-300 px-4 py-2">Video Ruta</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapea los videos y muestra cada uno en una fila de la tabla.
                            videos && videos.map((video : Video) => (
                                <tr key={video.id}>
                                    <td className="border border-gray-300 px-4 py-2">{video.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{video.titulo}</td>
                                    <td className="border border-gray-300 px-4 py-2">{video.descripcion}</td>
                                    <td className="border border-gray-300 px-4 py-2">{video.videoRuta}</td>
                                    <td className="hover:bg-red-950 border border-gray-300 px-4 py-2"><button onClick={() => EliminarVideo(video.id)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-10 w-[90%] p-5 rounded-lg bg-[rgb(29,28,28)] overflow-y-scroll">
                <h2 className="text-4xl font-bold mb-10 text-center">Mostrar Servicios</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Imagen Ruta</th>
                            <th className="border border-gray-300 px-4 py-2">Título</th>
                            <th className="border border-gray-300 px-4 py-2">Descripción</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapea los servicios y muestra cada uno en una fila de la tabla.
                            servicios && servicios.map((servicio: Servicio) => (
                                <tr key={servicio.id}>
                                    <td className="border border-gray-300 px-4 py-2">{servicio.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{servicio.imagenRuta}</td>
                                    <td className="border border-gray-300 px-4 py-2">{servicio.titulo}</td>
                                    <td className="border border-gray-300 px-4 py-2">{servicio.descripcion}</td>
                                    <td className="hover:bg-red-950 border border-gray-300 px-4 py-2"><button onClick={() => EliminarServicio(servicio.id)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-10 w-[90%] p-5 rounded-lg bg-[rgb(29,28,28)] overflow-y-scroll">
                <h2 className="text-4xl font-bold mb-10 text-center">Mostrar Clientes</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">Tipo de Servicio</th>
                            <th className="border border-gray-300 px-4 py-2">Ruta Imagen</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapea los clientes y muestra cada uno en una fila de la tabla.
                            clientes && clientes.map((cliente: Cliente) => (
                                <tr key={cliente.id}>
                                    <td className="border border-gray-300 px-4 py-2">{cliente.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{cliente.nombre}</td>
                                    <td className="border border-gray-300 px-4 py-2">{cliente.tipoServicio}</td>
                                    <td className="border border-gray-300 px-4 py-2">{cliente.rutaImagen}</td>
                                    <td className="hover:bg-red-950 border border-gray-300 px-4 py-2"><button onClick={() => EliminarCliente(cliente.id)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-10 w-[90%] p-5 rounded-lg bg-[rgb(29,28,28)] overflow-y-scroll">
                <h2 className="text-4xl font-bold mb-10 text-center">Mostrar Precios</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Tipo Servicio</th>
                            <th className="border border-gray-300 px-4 py-2">Descripción</th>
                            <th className="border border-gray-300 px-4 py-2">Precio</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapea los precios y muestra cada uno en una fila de la tabla.
                            precios && precios.map((precio : Precio) => (
                                <tr key={precio.id}>
                                    <td className="border border-gray-300 px-4 py-2">{precio.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{precio.tipoServicio}</td>
                                    <td className="border border-gray-300 px-4 py-2">{precio.descripcion}</td>
                                    <td className="border border-gray-300 px-4 py-2">{precio.precio}</td>
                                    <td className="hover:bg-red-950 border border-gray-300 px-4 py-2"><button onClick={() => EliminarPrecio(precio.id)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-10 p-5 rounded-lg bg-[rgb(29,28,28)] w-[90%] overflow-y-scroll ">
                <h2 className="text-4xl font-bold mb-10 text-center ">Mostrar Promociones</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Tipo Servicio</th>
                            <th className="border border-gray-300 px-4 py-2">Descripción</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapea las promociones y muestra cada una en una fila de la tabla.
                            promociones && promociones.map((promocion: Promocion) => (
                                <tr key={promocion.id}>
                                    <td className="border border-gray-300 px-4 py-2">{promocion.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{promocion.tipoServicio}</td>
                                    <td className="border border-gray-300 px-4 py-2">{promocion.descripcion}</td>
                                    <td className="hover:bg-red-950 border border-gray-300 px-4 py-2"><button onClick={() => EliminarPromocion(promocion.id)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-10 p-5 rounded-lg bg-[rgb(29,28,28)] w-[90%] overflow-y-scroll ">
                <h2 className="text-4xl font-bold mb-10 text-center">Mostrar Equipo</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Ruta Imagen</th>
                            <th className="border border-gray-300 px-4 py-2">Cargo</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapea el equipo y muestra cada uno en una fila de la tabla.
                            equipo && equipo.map((item : Equipo) => (
                                <tr key={item.id}>
                                    <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.rutaImagen}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.cargo}</td>
                                    <td className="hover:bg-red-950 border border-gray-300 px-4 py-2"><button onClick={() => EliminarEquipo(item.id)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-10 p-5 rounded-lg bg-[rgb(29,28,28)] w-[90%] overflow-y-scroll">
                <h2 className="text-4xl font-bold mb-10 text-center">Mostrar Contactos</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                            <th className="border border-gray-300 px-4 py-2">Mensaje</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapea los contactos y muestra cada uno en una fila de la tabla.
                            contactos && contactos.map((contacto : Contacto) => (
                                <tr key={contacto.id}>
                                    <td className="border border-gray-300 px-4 py-2">{contacto.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{contacto.nombre}</td>
                                    <td className="border border-gray-300 px-4 py-2">{contacto.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{contacto.telefono}</td>
                                    <td className="border border-gray-300 px-4 py-2">{contacto.mensaje}</td>
                                    <td className="hover:bg-red-950 border border-gray-300 px-4 py-2"><button onClick={() => EliminarContacto(contacto.id)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="mt-10 p-5 rounded-lg bg-[rgb(29,28,28)] w-[90%] overflow-y-scroll">
                <h2 className="text-4xl font-bold mb-10 text-center">Mostrar Imagenes</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>    
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Ruta Imagen</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapea las imagenes y muestra cada una en una fila de la tabla.
                            imagenes && imagenes.map((imagen : Imagen) => (
                                <tr key={imagen.id}>
                                    <td className="border border-gray-300 px-4 py-2">{imagen.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{imagen.ruta}</td>
                                    <td className="hover:bg-red-950 border border-gray-300 px-4 py-2"><button onClick={() => EliminarImagen(imagen.id)}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                        

                    </tbody>
                </table>
                
            </div>
        </div>
    );
}
