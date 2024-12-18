import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { UserInfo, UserInfo as UserInfoType } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const Section3 = ({ numerosEscogidosInput , setForm}: { numerosEscogidosInput: string, setForm: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [dataForm, setDataForm] = useState<Omit<UserInfoType, "id" | "createdAt">>({
        nombreCompleto: "",
        email: "",
        celular: "",
        pais: "",
        numerosEscogidos: "",
    });
    const [message, setMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [ userInfo, setUserInfo ] = useState<UserInfo[]>([]);
    const { dataUser } = useData() ?? {};

    useEffect(() => {
        if (dataUser) setUserInfo(dataUser);
    }, [dataUser]);
    

    useEffect(() => {
        if (!numerosEscogidosInput) return; // No hay necesidad de modificar si no se pasa el input
        setDataForm((prev) => ({
            ...prev,
            numerosEscogidos: numerosEscogidosInput,
        }));
    }, [numerosEscogidosInput]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dataForm.nombreCompleto || !dataForm.email || !dataForm.celular || !dataForm.pais || !dataForm.numerosEscogidos) {
            setMessage("Todos los campos son obligatorios");
            return;
        }

        const verify = userInfo.find((user) => user.email === dataForm.email);
        if(verify){
          setMessage("El correo ya se encuentra registrado");
          return
        }

        setMessage(null);
        localStorage.setItem("dataForm", JSON.stringify(dataForm));
        setDataForm({
            nombreCompleto: "",
            email: "",
            celular: "",
            pais: "",
            numerosEscogidos: "",
        })
        setOpen(false)
        setForm(true as boolean)
    };

    return (
        <section className="w-full h-auto flex flex-col items-center justify-center gap-y-10">
            <div className="w-full">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="px-6 py-3 bg-orange-600 text-white w-full hover:bg-orange-500 transition duration-200 text-lg">
                        Abrir Formulario y enviar la información
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-gray-800">Información Básica</DialogTitle>
                            <DialogDescription className="text-gray-600">
                                Por favor, completa los siguientes campos para continuar.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-gray-600 font-semibold">Nombre Completo:</label>
                                <input
                                    type="text"
                                    placeholder="Nombre Completo"
                                    name="nombreCompleto"
                                    value={dataForm.nombreCompleto}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600 font-semibold">Email:</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={dataForm.email}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600 font-semibold">Teléfono:</label>
                                <input
                                    type="number"
                                    placeholder="Teléfono"
                                    name="celular"
                                    value={dataForm.celular}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600 font-semibold">País:</label>
                                <input
                                    type="text"
                                    placeholder="Pais"
                                    name="pais"
                                    value={dataForm.pais}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-500 transition duration-200 focus:outline-none"
                                >
                                    Enviar Información
                                </button>
                            </div>
                        </form>
                        {message && (
                            <div className="mt-4 text-center text-red-500 font-bold">
                                {message}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
};

