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
    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [imagenes, setImagenes] = useState<Imagen[]>([]);
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [precios, setPrecios] = useState<Precio[]>([]);
    const [promociones, setPromociones] = useState<Promocion[]>([]);
    const [equipo, setEquipo] = useState<Equipo[]>([]);
    const [productos, setProductos] = useState<Product[]>([]);
    const [dataUser, setDataUser] = useState<UserInfo[]>([]);
    const [fecha, setFecha] = useState<Fecha[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = sessionStorage.getItem("dataContext");
                const parsedData = JSON.parse(storedData || "{}");

                if (storedData) {
                    // Establece los datos del almacenamiento en el estado
                    setContactos(parsedData.contactos);
                    setImagenes(parsedData.imagenes);
                    setServicios(parsedData.servicios);
                    setVideos(parsedData.videos);
                    setClientes(parsedData.clientes);
                    setPrecios(parsedData.precios);
                    setPromociones(parsedData.promociones);
                    setEquipo(parsedData.equipo);
                    setProductos(parsedData.productos);
                    setFecha(parsedData.fecha);
                }

                // Haz la petición a la API
                const response = await fetch("/api/datosdatos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const { contactos, imagenes, servicios, videos, clientes, precios, promociones, equipo, productos, dataUser, fecha } = data.info;
                    
                        // Actualiza el estado de dataUser desde la API
                    setDataUser(dataUser);
                    // Verifica si los datos obtenidos son diferentes de los almacenados
                    const newData = {
                        contactos,
                        imagenes,
                        servicios,
                        videos,
                        clientes,
                        precios,
                        promociones,
                        equipo,
                        productos,
                        fecha,
                    };

                    if (!storedData || JSON.stringify(parsedData) !== JSON.stringify(newData)) {
                        // Actualiza el estado con los nuevos datos
                        setContactos(contactos);
                        setImagenes(imagenes);
                        setServicios(servicios);
                        setVideos(videos);
                        setClientes(clientes);
                        setPrecios(precios);
                        setPromociones(promociones);
                        setEquipo(equipo);
                        setProductos(productos);
                        setFecha(fecha);

                        // Guarda los nuevos datos en sessionStorage, sin incluir dataUser
                        sessionStorage.setItem("dataContext", JSON.stringify(newData));
                    }
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error(error instanceof Error ? "Error fetching data:" : error);
            }
        };

        fetchData();
    }, []); // Empty dependency array para ejecutar solo al montar el componente

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
        fecha,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
