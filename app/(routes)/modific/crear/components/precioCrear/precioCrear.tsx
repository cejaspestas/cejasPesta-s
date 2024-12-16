"use client"
import { useState } from "react";

export const PrecioCrear = () => {
    const [precio, setPrecio] = useState({
        tipoServicio: '',
        descripcion: '',
        precio: 0,
    });
    const [message, setMessage] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === "tipoServicio" || e.target.name === "descripcion") {
            setPrecio({ ...precio, [e.target.name]: e.target.value });
        } else if (e.target.name === "precio") {
            setPrecio({ ...precio, [e.target.name]: parseFloat(e.target.value) });
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar si los campos requeridos están completos
        if (!precio.tipoServicio || !precio.descripcion || !precio.precio) {
            setMessage('Por favor completa todos los campos.');
            return;
        }

        try {
            const formDataPrecio = { 
                tipoServicio: precio.tipoServicio,
                descripcion: precio.descripcion,
                precio: precio.precio,
            };

            const response = await fetch('/api/modifapi/precio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataPrecio),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Precio creado exitosamente.');
                setPrecio({ tipoServicio: '', descripcion: '', precio: 0 });
            } else {
                setMessage(data.error || 'Error al crear el precio.');
            }

        } catch (error) {
            setMessage( error ? 'Error al conectar con el servidor.' :"");
        }
    }

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Crear Precio</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="tipoServicio" className="block text-sm font-medium mb-1">Tipo de Servicio</label>
                    <input
                        type="text"
                        name="tipoServicio"
                        value={precio.tipoServicio}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="descripcion" className="block text-sm font-medium mb-1">Descripción del Servicio</label>
                    <textarea
                        name="descripcion"
                        value={precio.descripcion}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="precio" className="block text-sm font-medium mb-1">Precio</label>
                    <input
                        type="number"
                        name="precio"
                        value={precio.precio}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Crear Precio
                </button>
            </form>

            {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        </div>

    )
}
