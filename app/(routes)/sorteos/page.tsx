"use client";
import { Section2 } from "./components/numerosSeleccionados/numerosSeleccionados";
import { Section1 } from "./components/section1images/section1";

export default function Sorteos() {
    return (
        <div className="flex flex-col min-h-[250vh] items-center justify-start gap-y-10">
            <Section1/>
            <Section2/>
        </div>
    );
}