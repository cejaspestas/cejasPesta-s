"use client"
import { useState } from "react"

export default function Contacto() {
    const [ message, setMessage ] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [form, setForm] = useState({
        email: "",
        nombre: "",
        telefono: "",
        mensaje: ""
    })

    // Tipo correcto para onChange en formularios
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> ) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value, // Actualiza el campo específico según el name
        }));
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await fetch("/api/contacto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
            
            if (!response.ok) {
                throw new Error("Error al enviar el formulario")
            }
            
            const data = await response.json()
            setLoading(false)
            setMessage(data.message)
            setError(false)
            setForm({
                email: "",
                nombre: "",
                telefono: "",
                mensaje: ""
            })
            
        } catch (error) {
            setError(true)
            setMessage( error ? "Error al enviar el formulario " : "")
        }
    }

    return (
        <div className="w-full min-h-[130vh] bg-gradient-to-b from-gray-950 to-black flex items-center justify-center flex-col p-4 gap-y-10">
            <div className="bg-[rgb(12,12,12)] shadow-lg rounded-lg p-6 w-[70%]">
                <h2 className="text-2xl font-medium mb-4 font-serif text-white text-center">
                    Formulario de contacto
                </h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="nombre"
                            className="block text-lg font-medium mb-2 text-white font-mono"
                        >
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium mb-2 text-white font-mono"
                        >
                            Correo Electrónico:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="telefono"
                            className="block text-lg font-medium mb-2 text-white font-mono"
                        >
                            Teléfono:
                        </label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={form.telefono}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="mensaje"
                            className="block text-lg font-medium mb-2 text-white font-mono"
                        >
                            Mensaje:
                        </label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            value={form.mensaje}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Enviar
                    </button>
                    {loading && (
                        <p className="text-center mt-4 text-gray-500">Loading...</p>
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
    
    )
}
