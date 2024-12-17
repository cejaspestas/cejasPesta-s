import { Product } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { mercadoPago } from "@/api";
import { Section3 } from "../../formuser/formUser";
import { useState } from "react";

export const Botondepago = ({ productSorteo, numerosEscogidos }: { productSorteo: Product[]; numerosEscogidos: string[] }) => {
    const [form, setForm] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async () => {
        if (!productSorteo.length) {
            console.error("No hay productos seleccionados para el pago.");
            return;
        }

        const data = {
            id: productSorteo[0]?.id,
            title: productSorteo[0]?.title,
            fecha: new Date().toLocaleString(),
            priceBoleto: productSorteo[0]?.priceBoleto,
            numerosEscogidos: numerosEscogidos.length,
        };

        try {
            const paymentUrl = await mercadoPago(data as typeof data);
            window.location.href = paymentUrl as string;
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            alert("Hubo un problema al procesar el pago. Por favor, inténtalo de nuevo.");
        }
    };

    if (!productSorteo.length) {
        return <p className="text-red-500 font-bold">No hay productos disponibles para el pago.</p>;
    }

    return (
        <section className="w-full flex flex-col items-center justify-center gap-y-8">
            <div className="flex flex-wrap justify-center items-center overflow-auto gap-2">
                {numerosEscogidos.map((num, index) => (
                    <p className="text-black font-bold bg-orange-500 border border-white p-3 rounded" key={index}>
                        {num}
                    </p>
                ))}
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="text-white font-semibold w-[50%] text-center font-mono py-3 px-5 bg-orange-600 hover:bg-orange-700 transition rounded">
                    Pagar
                </DialogTrigger>
                <DialogContent className="overflow-auto max-h-[80vh] bg-black p-5 rounded">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg text-center font-serif font-bold capitalize">
                            {`Por favor, una vez pagado el número, llene el formulario y presione "Enviar datos".`}
                        </DialogTitle>
                    </DialogHeader>
                    <label className="block font-bold text-orange-700 text-lg text-center mt-4">
                        {new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                        }).format(Number(productSorteo[0]?.priceBoleto) * numerosEscogidos.length)}{" "}
                        COP
                    </label>
                    <div className="w-full mt-6">
                        <Section3 numerosEscogidosInput={numerosEscogidos.join(",")} setForm={setForm} />
                    </div>
                    <div className="bg-orange-600 w-full flex items-center justify-center px-4 py-3 rounded mt-4">
                        <button
                            disabled={!form || localStorage.getItem("dataForm") === "" ? true : false}
                            className="text-white font-semibold w-[50%] font-serif py-3 px-5 bg-orange-600 hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            onClick={handleSubmit}
                            aria-disabled={!form || !open}
                        >
                            Finalizar el pago
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};
