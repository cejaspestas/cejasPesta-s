"use client"
import { useState } from "react";

export const EquipoCrear = () => {
    const [equipo, setEquipo] = useState({
        cargo: '',
    });
    const [files, setFiles] = useState<File | null>(null);
    const [imagenes, setImagenes] = useState<string[]>([]);
    console.log(imagenes ? "s": "");
    const [message, setMessage] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "cargo") {
            setEquipo({ ...equipo, [e.target.name]: e.target.value });
        }
        if (e.target.files) {
            setFiles(e.target.files[0]);
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar si el campo cargo y el archivo están presentes
        if (!equipo.cargo) {
            setMessage('Por favor, completa el campo de cargo.');
            return;
        }

        if (!files) {
            setMessage('Por favor selecciona una imagen.');
            return;
        }

        try {
            // Crear FormData para subir la imagen
            const formData = new FormData();
            formData.append('file', files);

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

            // Enviar los datos del equipo junto con la ruta de la imagen
            const formDataEquipo = { 
                rutaImagen: data.rutas[0], // Usando la primera ruta como ejemplo
                cargo: equipo.cargo,
            };

            const response2 = await fetch('/api/modifapi/equipo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataEquipo),
            });

            const data2 = await response2.json();

            if (response2.ok) {
                setMessage('Equipo creado exitosamente.');
                setEquipo({ cargo: '' });
                setFiles(null);
                setImagenes([]);
            } else {
                setMessage(data2.error || 'Error al crear el equipo.');
            }

        } catch (error) {
            setMessage(error ? "'Error al conectar con el servidor.'" : "");
        }
    }

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Crear Equipo</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label 
                        htmlFor="cargo" 
                        className="block text-sm font-medium mb-2"
                    >
                        Cargo del Miembro del Equipo
                    </label>
                    <input
                        type="text"
                        name="cargo"
                        value={equipo.cargo}
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
                    Crear Equipo
                </button>
            </form>

            {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        </div>

    )
}
