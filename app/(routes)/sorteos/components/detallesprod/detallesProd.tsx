import { Product } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export const DetallesProd = ({ productSorteo }: { productSorteo: Product[] }) => {
    const product = productSorteo[0];

    return (
        <div className="w-full h-[30%] p-4 flex items-center justify-center">
            <Dialog>
                <DialogTrigger className="text-white font-semibold font-mono py-4 px-6 bg-orange-600  hover:bg-orange-700 transition">
                    Abrir Para Ver Más Detalles Del Producto
                </DialogTrigger>
                <DialogContent className="overflow-auto max-h-[80vh] bg-black">
                    <DialogHeader>
                        <DialogTitle className="text-white text-3xl text-center font-serif font-bold">
                            {product?.title || "Producto no disponible"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4">
                        {product?.ImagenRuta ? (
                            <div className="w-full h-auto max-w-lg">
                                <img
                                    className="w-full h-full object-cover rounded-lg"
                                    src={product.ImagenRuta[0]}
                                    alt={product.title}
                                />
                            </div>
                        ) : (
                            <div className="w-full max-w-lg text-center p-4 bg-gray-200 rounded-lg">
                                Imagen no disponible
                            </div>
                        )}
                        <p className="text-xl text-gray-700">
                            {product?.description || "Descripción no disponible"}
                        </p>
                        <p className="text-xl text-gray-700">
                            {product?.caracteristicas || "Precio no disponible"}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
