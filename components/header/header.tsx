"use client";
import { NavbarDesktop } from "./components/navbarDesktop";
import { NavMobile } from "./components/navbarMobile";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    const [scrollPosition, setScrollPosition] = useState<boolean>(false);
    const rutas = ["/modific/sorteo", "/modific/crear", "/modific/mostrar", "/sorteos"];
    const [scroll , setScroll] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY > 0);
            setScroll(window.scrollY > 0);
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
                scrollPosition
                    ? "bg-gradient-to-b from-bgsecond to-bgtecer"
                    :  `${pathname === "/sobre-nosotros" ? "md:bg-transparent bg-bgsecond" : "bg-transparent"}` 
            }`
            }
        >
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src="/logo1.png"
                        alt="logo"
                        width={200} // Ajusta este valor según el tamaño necesario
                        height={200} // Ajusta este valor según el tamaño necesario
                        className="object-cover w-[8vh] h-[8vh] md:h-16 md:w-16" // Aumenté el tamaño para pantallas pequeñas y grandes
                    />
                </Link>
            </div>
            {/* Mostrar solo en escritorio */}
            <div className="hidden md:flex">
                <NavbarDesktop scroll={scroll} />
            </div>
            {/* Mostrar solo en móvil */}
            <div className="md:hidden">
                <NavMobile />
            </div>
        </nav>
    );
}
