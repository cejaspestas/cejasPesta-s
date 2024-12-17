"use client";
import { useEffect, useState } from "react";
import { Section2 } from "./components/numerosSeleccionados/numerosSeleccionados";
import { Section1 } from "./components/section1images/section1";

export default function Sorteos() {
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [datalocalstorage, setDataLocalStorage] = useState<Record<string, typeof localStorage> | null>(null);
    
    useEffect(() => {
        // Simula la verificación del estado del pago desde la URL o algún parámetro
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("status"); // Suponiendo que el estado de pago es "approved" en la URL
        if (status) {
            setPaymentStatus(status); // Actualizamos el estado con el valor del parámetro
        }
    }, []);
    
    useEffect(() => {
        const data = localStorage.getItem("dataForm");
        setDataLocalStorage(data ? JSON.parse(data) : null);
    }, []);
    
    useEffect(() => {
        if (paymentStatus === "approved" && datalocalstorage) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/sortteos`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(datalocalstorage),
                    });
    
                    const data = await response.json();
                    if (response.ok) {
                        console.log("Éxito:", data);
                    } else {
                        console.error("Error en la respuesta:", data);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error instanceof Error ? "error" : "Unknown error");
                }
            };
    
            fetchData();
        }
    }, [paymentStatus, datalocalstorage]);
    
    return (
        <div className="flex flex-col min-h-[250vh] items-center justify-start xl:gap-y-1 lg:gap-y-[35vh]  gap-y-20">
            <Section1 />
            <Section2 />
        </div>
    );
}
