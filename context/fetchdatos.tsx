"use client";
import { Cliente, Contacto, Equipo, Fecha, Imagen, Precio, Product, Promocion, Servicio, UserInfo, Video } from "@prisma/client";
import { createContext, useState, useEffect, ReactNode, useContext } from "react";

type Props = {
  contactos: Contacto[];
  imagenes: Imagen[];
  servicios: Servicio[];
  videos: Video[];
  clientes: Cliente[];
  precios: Precio[];
  promociones: Promocion[];
  equipo: Equipo[];
  productos: Product[];
  dataUser: UserInfo[];
  fecha: Fecha[];
} | null;

const DataContext = createContext<Props>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [contactos , setContactos] = useState<Contacto[]>([]);
    const [imagenes , setImagenes] = useState<Imagen[]>([]);
    const [servicios , setServicios] = useState<Servicio[]>([]);
    const [videos , setVideos] = useState<Video[]>([]);
    const [clientes , setClientes] = useState<Cliente[]>([]);
    const [precios , setPrecios] = useState<Precio[]>([]);
    const [promociones , setPromociones] = useState<Promocion[]>([]);
    const [equipo , setEquipo] = useState<Equipo[]>([]);
    const [productos , setProductos] = useState<Product[]>([]);
    const [dataUser , setDataUser] = useState<UserInfo[]>([]);
    const [fecha , setFecha] = useState<Fecha[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/datosdatos', {
                    method : 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const { contactos, imagenes, servicios, videos, clientes, precios, promociones, equipo, productos, dataUser, fecha } = data.info;

                    // Update state with the fetched data
                    setContactos(contactos);
                    setImagenes(imagenes);
                    setServicios(servicios);
                    setVideos(videos);
                    setClientes(clientes);
                    setPrecios(precios);
                    setPromociones(promociones);
                    setEquipo(equipo);
                    setProductos(productos);
                    setDataUser(dataUser);
                    setFecha(fecha);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error(error instanceof Error ? "Error fetching data:": "");
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only once on component mount

    const value = {
        contactos,
        imagenes,
        servicios,
        videos,
        clientes,
        precios,
        promociones,
        equipo,
        productos,
        dataUser,
        fecha
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext); // Hook to use the context in child components
