"use client";
import { redirect } from "next/navigation";
import { FechaCrear } from "./components/Fecha/fecha";
import { Product } from "./components/productCrear/product";
import { UserInfo } from "./components/userinfoCrear/userInfo";
import { useUser } from "@clerk/nextjs"

export default function SorteoEditar() {
    const { user } = useUser();
    if (user) {
        if(user.primaryEmailAddress?.emailAddress !== "cejaspestaaaas343@gmail.com"){
            return redirect("/modific")
        }
    }
    if(!user) return redirect("/modific")


    return (
        <section className="flex flex-col justify-center items-center gap-y-10">
            <h1>Crear Sorteo</h1>
            <div className="w-[90%]">
                <UserInfo/>
            </div>
            <div className="w-[90%]">
                <Product/>
            </div>
            <div className="w-[90%]">
                <FechaCrear/>
            </div>
        </section>
    )
}