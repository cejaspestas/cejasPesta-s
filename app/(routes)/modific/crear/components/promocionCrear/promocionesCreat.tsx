"use client";

import { useState } from "react";

export const PromocionCrear = () => {
    const [promocion, setPromocion] = useState({
        tipoServicio: '',
        descripcion: '',
    });
    const [message, setMessage] = useState<string>('');
    const [files, setFiles] = useState<File | null>(null);
    const [imagenes, setImagenes] = useState<string[]>([]);
    console.log(imagenes ? "d" : "");
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        if (name === "tipoServicio" || name === "descripcion") {
            setPromocion({ ...promocion, [name]: value });
        }
    
        if (name === "imagen" && e.target instanceof HTMLInputElement && e.target.files) {
            setFiles(e.target.files[0]); // Guardar el primer archivo seleccionado
        }
    };
    

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar que todos los campos estén completos
        if (!promocion.tipoServicio || !promocion.descripcion || !files) {
            setMessage('Por favor completa todos los campos y selecciona una imagen.');
            return;
        }

        // Subir imagen
        try {
            const formData = new FormData();
            formData.append('file', files);

            const imageResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const imageData = await imageResponse.json();

            if (!imageResponse.ok) {
                setMessage(imageData.error || 'Error al subir la imagen.');
                return;
            }

            const { rutas } = imageData;
            setImagenes(rutas);

            // Enviar datos de la promoción
            const promocionData = {
                tipoServicio: promocion.tipoServicio,
                descripcion: promocion.descripcion,
                imagenes: rutas, // Agregar las rutas de las imágenes subidas
            };

            const promocionResponse = await fetch('/api/modifapi/promocion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(promocionData),
            });

            const promocionResponseData = await promocionResponse.json();

            if (promocionResponse.ok) {
                setMessage('Promoción creada exitosamente.');
                setPromocion({ tipoServicio: '', descripcion: '' });
                setFiles(null);
            } else {
                setMessage(promocionResponseData.error || 'Error al crear la promoción.');
            }
        } catch (error) {
            setMessage( error ? 'Error al conectar con el servidor.': "");
        }
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Crear Promoción</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="tipoServicio" className="block text-sm font-medium mb-1">
                        Tipo de Servicio
                    </label>
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
                    <label htmlFor="descripcion" className="block text-sm font-medium mb-1">
                        Descripción de la Promoción & precio de la promoción y/o porcentaje de descuento
                    </label>
                    <textarea
                        name="descripcion"
                        value={promocion.descripcion}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="imagen" className="block text-sm font-medium mb-1">
                        Imagen de la Promoción
                    </label>
                    <input
                        type="file"
                        name="imagen"
                        onChange={onChange}
                        required
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
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
    );
};
