"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { dataRoutes } from "../sidebarRoutes.data"
import { SideBarItem } from "../sidebaritem"
import { useState } from "react"


export const NavMobile = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger>
                        <Menu className="w-6 h-6 rounded-md text-white"/>
                    </SheetTrigger>
                    <SheetContent className="z-[999] bg-[rgb(12,12,12)] border-none ">
                        <SheetTitle className="text-center text-white font-serif">Menu</SheetTitle>
                        <SheetClose className="bg-white text-white" />
                        <div className="flex flex-col gap-y-10 w-full h-screen items-center justify-start mt-10 ">
                            {
                                dataRoutes.map((route) => {
                                    const isSorteos = route.label === "Sorteos";
                                    const itemClass = isSorteos ? "text-white hover:text-orange-500 bg-orange-500 px-5 py-2 rounded-md font-serif" : "text-white font-mono text-xl hover:text-gray-300 py-2";

                                    return (
                                        <SideBarItem
                                            className={itemClass}
                                            item={route}
                                            key={route.href}
                                        />
                                    );
                                })
                            }
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}