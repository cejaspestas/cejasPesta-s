"use client"
import { useState } from "react";

export const ClienteCrear = () => {
    const [cliente, setCliente] = useState({
        nombre: '',
        tipoServicio: '',
    });
    const [files, setFiles] = useState<File | null>(null);
    const [imagenes, setImagenes] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "nombre" || e.target.name === "tipoServicio") {
            setCliente({ ...cliente, [e.target.name]: e.target.value });
        }
        if (e.target.files) {
            setFiles(e.target.files[0]);
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar si los campos requeridos y los archivos están presentes
        if (!cliente.nombre || !cliente.tipoServicio) {
            setMessage('Por favor, completa todos los campos');
            return;
        }

        if (!files) {
            setMessage('Por favor selecciona una imagen');
            return;
        }

        try {
            // Crear FormData para enviar los datos al backend
            const formData = new FormData();
            formData.append('file', files);

            // Enviar la imagen primero
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir la imagen.');
            }

            const data = await response.json();
            setImagenes(data.rutas); // Suponiendo que el servidor responde con las rutas de la imagen
            setMessage('Imagen subida con éxito.');

            // Ahora, enviar los datos del cliente junto con la ruta de la imagen
            const formDataCliente = { 
                rutaImagen: data.rutas[0], // Usando la primera ruta como ejemplo
                nombre: cliente.nombre, 
                tipoServicio: cliente.tipoServicio 
            };

            const response2 = await fetch('/api/modifapi/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataCliente),
            });

            const data2 = await response2.json();

            if (response2.ok) {
                setMessage('Cliente creado exitosamente.');
                setCliente({ nombre: '', tipoServicio: '' });
                setFiles(null);
                setImagenes([]);
            } else {
                setMessage(data2.error || 'Error al crear el cliente.');
            }

        } catch (error) {
            setMessage('Error al conectar con el servidor.');
        }
    }

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg ">
            <h1 className="text-2xl font-bold mb-6 text-center">Crear Cliente</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label 
                        htmlFor="nombre" 
                        className="block text-sm font-medium mb-2"
                    >
                        Nombre del Cliente
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
        
                <div>
                    <label 
                        htmlFor="tipoServicio" 
                        className="block text-sm font-medium mb-2"
                    >
                        Tipo de Servicio
                    </label>
                    <input
                        type="text"
                        name="tipoServicio"
                        value={cliente.tipoServicio}
                        onChange={onChange}
                        required
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
        
                <div>
                    <label 
                        htmlFor="subirimagen" 
                        className="block text-sm font-medium mb-2"
                    >
                        Subir Imagen
                    </label>
                    <input
                        type="file"
                        name="rutaImagen"
                        onChange={onChange}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                </div>
        
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Crear Cliente
                </button>
            </form>
        
            {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        </div>
        
    )
}
