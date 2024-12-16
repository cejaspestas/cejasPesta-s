"use client";
import { dataRoutes } from "../sidebarRoutes.data";
import { SideBarItem } from "../sidebaritem";
import { usePathname } from "next/navigation";

export const NavbarDesktop = () => {
    const pathname = usePathname();
    return (
        <div className="flex-row gap-x-10 hidden md:flex">
            {dataRoutes.map((route) => {
                const isActive = pathname === route.href;
                const itemClass = `text-white hover:text-gray-300 py-2 font-serif text-md md:text-lg ${isActive ? "border-b-4 border-orange-500" : ""} ${
                    route.label === "Sorteos"
                        ? "bg-orange-500 hover:bg-orange-600 py-2 px-5 rounded-md"
                        : "hover:border-b-4 transition-all ease-in-out border-orange-500"
                }`;

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
