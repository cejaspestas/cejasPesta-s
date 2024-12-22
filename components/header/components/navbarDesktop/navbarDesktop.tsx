"use client";
import { dataRoutes } from "../sidebarRoutes.data";
import { SideBarItem } from "../sidebaritem";
import { usePathname } from "next/navigation";

export const NavbarDesktop = ({scroll} : {scroll: boolean}) => {
  const pathname = usePathname();

  return (
    <div className="flex-row gap-x-10 hidden md:flex">
      {dataRoutes.map((route) => {
        // Verifica si la ruta es la actual
        const isActive = pathname === route.href;
        
        // Verifica si la ruta es /sobre-nosotros o /contacto para aplicar un estilo diferente
        const isSpecialPath = pathname === "/sobre-nosotros" || pathname === "/contacto";

        // Definir las clases para cada item de la navegación
        const itemClass = `${isSpecialPath ? `${scroll ? "text-bgprin" : "text-bgsecond"}` : "text-textprin"} hover:text-texthover py-2 font-serif text-md md:text-lg ${
          isActive
            ? "border-b-4 border-texthover"
            : ""
        } ${
          route.label === "Sorteos"
            ? "bg-texthover text-bgprin hover:bg-bghoverpara py-2 px-5 rounded-md"
            : "hover:border-b-4 transition-all ease-in-out border-texthover"
        }`;

        // Retorna el componente SideBarItem con las clases aplicadas
        return (
          <SideBarItem
            className={itemClass}
            item={route}
            key={route.href}
          />
        );
      })}
    </div>
  );
};
