"use client";
import { FechaCrear } from "./components/Fecha/fecha";
import { Product } from "./components/productCrear/product";
import { UserInfo } from "./components/userinfoCrear/userInfo";

export default function SorteoEditar() {


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