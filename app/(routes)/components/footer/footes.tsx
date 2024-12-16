"use client";
import { dataRoutes } from "@/components/header/components/sidebarRoutes.data";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { usePathname } from "next/navigation";

export const Footer = () => {
    const pathname = usePathname();
    let rutas = ["/modific/sorteo", "/modific/crear", "/modific/mostrar", "/sorteos"]

    return (
        <footer className={`bg-[#191919] text-white py-20 px-6 flex items-center justify-center ${rutas.includes(pathname) ? "hidden" : ""}`}>
            <div className="w-full max-w-[1200px] container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Sección de información */}
                <div>
                    <h4 className="font-bold text-xl mb-4 text-gray-200">Cejas y Pestañas Cúcuta</h4>
                    <p className="text-gray-400 text-sm leading-6">
                        En Cejas y Pestañas Cúcuta te ofrecemos los mejores servicios de micropigmentación para realzar tu belleza de forma única y duradera.
                    </p>
                </div>

                {/* Menú de navegación */}
                <div>
                    <h4 className="font-bold text-xl mb-4 text-gray-200">Sitio Menú</h4>
                    <ul className="space-y-3">
                        {dataRoutes.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} className="text-gray-400 hover:text-white transition">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div>
                    <h4 className="font-bold text-xl mb-4 text-gray-200">Redes Sociales</h4>
                    <div className="flex items-center gap-6">
                        <Link
                            href="https://www.facebook.com"
                            target="_blank"
                            className="text-gray-400 hover:text-blue-500 transition"
                        >
                            <FaFacebookF size={28} />
                        </Link>
                        <Link
                            href="https://wa.me/573148327958"
                            target="_blank"
                            className="text-gray-400 hover:text-green-500 transition"
                        >
                            <BsWhatsapp size={28} />
                        </Link>
                    </div>
                </div>

                {/* Contacto */}
                <div>
                    <h4 className="font-bold text-xl mb-4 text-gray-200">Contáctanos</h4>
                    <ul className="space-y-3 text-gray-400 text-sm leading-6">
                        <li>Teléfono: +57 314 8327958</li>
                        <li>Email: cejasypestanasadomicilio@gmail.com</li>
                        <li>Dirección: Calle Ficticia, Cúcuta</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
