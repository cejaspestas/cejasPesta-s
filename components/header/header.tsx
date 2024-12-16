"use client";
import { NavbarDesktop } from "./components/navbarDesktop";
import { NavMobile } from "./components/navbarMobile";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
    const [scrollPosition, setScrollPosition] = useState<boolean>(false);
    let rutas = ["/modific/sorteo", "/modific/crear", "/modific/mostrar", "/sorteos"]
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = (e: Event) => {
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
            } items-center px-2 gap-x-4 md:px-6 justify-between w-full transition-all ease-in-out h-[14vh] z-[300]  ${
                scrollPosition ? "bg-[rgb(0,0,0)] " : "bg-transparent"
            }`}
        >
            <div>
                <p className="text-xl font-bold">Logo</p>
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
