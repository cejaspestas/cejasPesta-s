"use client";
import { useState, useEffect } from "react";

export const ServiciosCrear = () => {
    const [servicio, setServicio] = useState({
        titulo: '',
        descripcion: '',
    });
    const [files, setFiles] = useState<File | null>(null);
    const [imagenes, setImagenes] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (imagenes.length > 0) {
            const enviarDatos = async () => {
                try {
                    const formData = {
                        imagenRuta: imagenes[0],
                        titulo: servicio.titulo,
                        descripcion: servicio.descripcion,
                    };

                    const response = await fetch('/api/modifapi/servicios', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setMessage('Servicio creado exitosamente.');
                        setServicio({ titulo: '', descripcion: '' });
                        setFiles(null);
                        setImagenes([]);
                    } else {
                        setMessage(data.error || 'Error al crear el servicio.');
                    }
                } catch (error) {
                    setMessage('Error al conectar con el servidor.');
                }
            };

            enviarDatos();
        }
    }, [imagenes]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
        const { name, value } = e.target;
        if (name === "titulo" || name === "descripcion") {
            setServicio({ ...servicio, [name]: value });
        }
        if (e.target instanceof HTMLInputElement && e.target.type === "file" && e.target.files) {
            setFiles(e.target.files[0]);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!files) {
            setMessage('Por favor selecciona una imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('file', files);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Imagen subida exitosamente.');
                setImagenes(data.rutas);
                
            } else {
                setMessage(data.error || 'Error al subir la imagen.');
            }
        } catch (error) {
            setMessage('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Servicios Crear</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="titulo" className="block text-sm font-medium mb-1">Título</label>
                    <input
                        type="text"
                        name="titulo"
                        value={servicio.titulo}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="descripcion" className="block text-sm font-medium mb-1">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={servicio.descripcion}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="imagen" className="block text-sm font-medium mb-1">Subir Imagen</label>
                    <input
                        type="file"
                        name="imagen"
                        onChange={onChange}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Crear Servicio
                </button>
            </form>

            {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        </div>


    );
};
