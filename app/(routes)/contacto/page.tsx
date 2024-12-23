"use client";
import { useState } from "react";

export default function Contacto() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        email: "",
        nombre: "",
        telefono: "",
        mensaje: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("/api/contacto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Error al enviar el formulario");
            }

            const data = await response.json();
            setLoading(false);
            setMessage(data.message);
            setError(false);
            setForm({
                email: "",
                nombre: "",
                telefono: "",
                mensaje: ""
            });
        } catch (error) {
            setError(true);
            setMessage( error ? "Error al enviar el formulario" : "");
        }
    };

    return (
        <div className="w-full min-h-[130vh] bg-bgprin flex items-center justify-center flex-col p-4 gap-y-10">
            <div className="bg-bgsecond shadow-lg rounded-lg p-6 w-[70%]">
                <h2 className="text-2xl font-medium mb-4 font-serif text-textprin text-center">
                    Formulario de contacto
                </h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="nombre"
                            className="block text-lg font-medium mb-2 text-textprin font-mono"
                        >
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-bgsecond rounded-lg bg-bgtecer text-textprin focus:outline-none focus:ring-2 focus:ring-texthover"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium mb-2 text-textprin font-mono"
                        >
                            Correo Electrónico:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-bgsecond rounded-lg bg-bgtecer text-textprin focus:outline-none focus:ring-2 focus:ring-texthover"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="telefono"
                            className="block text-lg font-medium mb-2 text-textprin font-mono"
                        >
                            Teléfono:
                        </label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={form.telefono}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-bgsecond rounded-lg bg-bgtecer text-textprin focus:outline-none focus:ring-2 focus:ring-texthover"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="mensaje"
                            className="block text-lg font-medium mb-2 text-textprin font-mono"
                        >
                            Mensaje:
                        </label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            value={form.mensaje}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-bgsecond rounded-lg bg-bgtecer text-textprin focus:outline-none focus:ring-2 focus:ring-texthover"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-texthover text-textprin py-2 px-4 rounded-lg hover:bg-bghoverpara focus:outline-none focus:ring-2 focus:ring-texthover"
                    >
                        Enviar
                    </button>
                    {loading && (
                        <p className="text-center mt-4 text-textsecond">Loading...</p>
                    )}
                    {message && (
                        <p
                            className={`mt-4 text-center ${
                                error ? "text-red-500" : "text-green-500"
                            }`}
                        >
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
