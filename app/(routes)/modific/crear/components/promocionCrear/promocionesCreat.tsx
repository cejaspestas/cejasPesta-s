"use client"
import { useState } from "react";

export const PromocionCrear = () => {
    const [promocion, setPromocion] = useState({
        tipoServicio: '',
        descripcion: '',
    });
    const [message, setMessage] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === "tipoServicio" || e.target.name === "descripcion") {
            setPromocion({ ...promocion, [e.target.name]: e.target.value });
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar si los campos requeridos están completos
        if (!promocion.tipoServicio || !promocion.descripcion) {
            setMessage('Por favor completa todos los campos.');
            return;
        }

        try {
            const formDataPromocion = { 
                tipoServicio: promocion.tipoServicio,
                descripcion: promocion.descripcion,
            };

            const response = await fetch('/api/modifapi/promocion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataPromocion),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Promoción creada exitosamente.');
                setPromocion({ tipoServicio: '', descripcion: '' });
            } else {
                setMessage(data.error || 'Error al crear la promoción.');
            }

        } catch (error) {
            setMessage('Error al conectar con el servidor.');
        }
    }

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold mb-6 text-center">Crear Promoción</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="tipoServicio" className="block text-sm font-medium mb-1">Tipo de Servicio</label>
                    <input
                        type="text"
                        name="tipoServicio"
                        value={promocion.tipoServicio}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="descripcion" className="block text-sm font-medium mb-1">Descripción de la Promoción & precio de la promocion y/o porcentaje de descuento </label>
                    <textarea
                        name="descripcion"
                        value={promocion.descripcion}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Crear Promoción
                </button>
            </form>

        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        </div>

    )
}
