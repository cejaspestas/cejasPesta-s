"use client";
import { dataRoutes } from "@/components/header/components/sidebarRoutes.data";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { usePathname } from "next/navigation";

export const Footer = () => {
    const pathname = usePathname();
    const rutas = ["/modific/sorteo", "/modific/crear", "/modific/mostrar", "/sorteos"];

    return (
        <footer
            className={`bg-bgsecond text-textprin py-20 px-6 flex items-center justify-center ${rutas.includes(pathname) ? "hidden" : ""}`}
        >
            <div className="w-full max-w-[1200px] container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Sección de información */}
                <div>
                    <h4 className="font-bold text-xl mb-4 text-textprin">Cejas y Pestañas Cúcuta</h4>
                    <p className="text-textsecond text-sm leading-6">
                        En Cejas y Pestañas Cúcuta te ofrecemos los mejores servicios de micropigmentación para realzar tu belleza de forma única y duradera.
                    </p>
                </div>

                {/* Menú de navegación */}
                <div>
                    <h4 className="font-bold text-xl mb-4 text-textprin">Sitio Menú</h4>
                    <ul className="space-y-3">
                        {dataRoutes.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="text-textsecond hover:text-texthover transition"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div>
                    <h4 className="font-bold text-xl mb-4 text-textprin">Redes Sociales</h4>
                    <div className="flex items-center gap-6">
                        <Link
                            href="https://www.facebook.com"
                            target="_blank"
                            className="text-textsecond hover:text-texthover transition"
                        >
                            <FaFacebookF size={28} />
                        </Link>
                        <Link
                            href="https://wa.me/573148327958"
                            target="_blank"
                            className="text-textsecond hover:text-texthover transition"
                        >
                            <BsWhatsapp size={28} />
                        </Link>
                    </div>
                </div>

                {/* Contacto */}
                <div>
                    <h4 className="font-bold text-xl mb-4 text-textprin">Contáctanos</h4>
                    <ul className="space-y-3 text-textsecond text-sm leading-6">
                        <li>Teléfono: +57 314 8327958</li>
                        <li>Email: cejasypestanasadomicilio@gmail.com</li>
                        <li>La Riviera, Norte de Santander, Colombia · Cúcuta, Colombia</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
