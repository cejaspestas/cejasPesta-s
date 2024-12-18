"use client";
import { NavbarDesktop } from "./components/navbarDesktop";
import { NavMobile } from "./components/navbarMobile";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Header() {
    const [scrollPosition, setScrollPosition] = useState<boolean>(false);
    const rutas = ["/modific/sorteo", "/modific/crear", "/modific/mostrar", "/sorteos"]
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = (e: Event) => {
            console.log(e ? "d" : "");
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
                scrollPosition ? "bg-gradient-to-b from-gray-950 to-black" : "bg-transparent"
            }`}
        >
            <div>
                <p className="text-xl font-bold">
                    <Image src="/logo1.png" alt="logo" width={100} height={100} className=""/>
                </p>
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
