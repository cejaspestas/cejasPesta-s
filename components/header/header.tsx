"use client";
import { NavbarDesktop } from "./components/navbarDesktop";
import { NavMobile } from "./components/navbarMobile";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Header() {
    const [scrollPosition, setScrollPosition] = useState<boolean>(false);
    const rutas = ["/modific/sorteo", "/modific/crear", "/modific/mostrar", "/sorteos"];
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`flex fixed ${
                rutas.includes(pathname) ? "hidden" : ""
            } items-center px-4 md:px-6 justify-between w-full transition-all ease-in-out h-[14vh] z-[300] ${
                scrollPosition ? "bg-gradient-to-b from-gray-950 to-black" : "bg-transparent"
            }`}
        >
            <div className="flex items-center">
                <a href="/">
                    <Image
                        src="/logo1.png"
                        alt="logo"
                        width={150} // Ajusta este valor según el tamaño necesario
                        height={150} // Ajusta este valor según el tamaño necesario
                        className="object-contain w-20 h-20 md:h-20" // Aumenté el tamaño para pantallas pequeñas y grandes
                    />
                </a>
            </div>
            {/* Mostrar solo en escritorio */}
            <div className="hidden md:flex">
                <NavbarDesktop />
            </div>
            {/* Mostrar solo en móvil */}
            <div className="md:hidden">
                <NavMobile />
            </div>
        </nav>
    );
}
