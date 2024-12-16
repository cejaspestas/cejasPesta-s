import { Product } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {mercadoPago} from "@/api"
import { Section3 } from "../../formuser/formUser";
  
export const Botondepago = ({productSorteo, numerosEscogidos}: {productSorteo: Product[], numerosEscogidos: string[]}) => {
    const handleSubmit = async () => {
        const data = {
          id: productSorteo[0]?.id,
          title: productSorteo[0]?.title,
          fecha : Date.now().toLocaleString(),
          priceBoleto: productSorteo[0]?.priceBoleto,
          numerosEscogidos: numerosEscogidos.length
        };
        
        try {
          const paymentUrl = await mercadoPago(data as any);
          window.location.href = paymentUrl as  string; 
        } catch (error) {
          console.error('Error al procesar el pago:', error);
        }
    };
      
    return (
        <section className="w-full flex flex-col items-center justify-center gap-y-20">
            <div className="flex justify-center items-center overflow-auto gap-x-5">
                {
                    numerosEscogidos.map ((num, index) => (
                        <p className="text-black font-bold bg-orange-500 border border-white p-5" key={index}>{num}</p>
                    ))
                }
            </div>
            <Dialog>
                <DialogTrigger className="text-white font-semibold w-[50%] font-mono py-4 px-6 bg-orange-600  hover:bg-orange-700 transition">
                    Pagar
                </DialogTrigger>
                <DialogContent className="overflow-auto max-h-[80vh] bg-black">
                    <DialogHeader>
                        <DialogTitle className="text-white text-xl text-center font-serif font-bold capitalize">
                        Por favor una vez pagado el numero llene el formulario y presione enviar datos 
                        </DialogTitle>
                    </DialogHeader>
                    <label className="font-bold text-orange-700 capitalize text-xl text-center">
                    {new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                    }).format(Number(productSorteo[0]?.priceBoleto) * numerosEscogidos.length)} COP
                    </label>
                    <div className="bg-orange-600 w-full flex items-center justify-center p-x-2 h ">
                        <button className="text-white font-semibold w-[50%] font-serif py-4 px-6 bg-orange-600  hover:bg-orange-700 transition" type="submit" onClick={handleSubmit}>Finalizar el pago</button>
                    </div>
                    <div className="w-full">
                        <Section3 numerosEscogidosInput={numerosEscogidos.join(",")} />
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}