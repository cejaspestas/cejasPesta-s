import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { dataRoutes } from "../sidebarRoutes.data";
import { SideBarItem } from "../sidebaritem";
import { usePathname } from "next/navigation";

export const NavMobile = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Para detectar cambios de ruta

  useEffect(() => {
    setOpen(false);
  }, [pathname]); // Cierra el menú al cambiar de ruta

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu className="w-6 h-6 rounded-md text-textprin" />
        </SheetTrigger>
        <SheetContent className="z-[999] bg-bgsecond border-none">
          <SheetTitle className="text-center text-textprin font-serif">
            Menú
          </SheetTitle>
          <SheetClose className="bg-textprin text-textprin" />
          <div className="flex flex-col gap-y-10 w-full h-screen items-center justify-start mt-10">
            {dataRoutes.map((route) => {
              const isSorteos = route.label === "Sorteos";

              const itemClass = isSorteos
                ? "text-textprin hover:text-texthover bg-texthover px-5 py-2 rounded-md font-serif"
                : "text-textprin font-mono text-xl hover:text-texthover py-2";

              return (
                <SideBarItem className={itemClass} item={route} key={route.href} />
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
