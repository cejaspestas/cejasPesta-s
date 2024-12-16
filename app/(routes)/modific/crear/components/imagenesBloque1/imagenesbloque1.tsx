"use client"
import { useState , useEffect } from "react"


export const ImagenesBloque1 = () => {
    const [imagenes, setImagenes] = useState([])
    const [files , setFiles] = useState<File>()
    const [message, setMessage] = useState<string>('');
    console.log(message ? "d" : "");
    useEffect(() => {
        if (imagenes.length > 0) {
            const enviarImagen = async () => {
                try {
                    const formData = { rutaImagen: imagenes[0] }; // Usa el primer elemento
    
                    const response2 = await fetch('/api/modifapi/imagenbloque1', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });
    
                    const data2 = await response2.json();
    
                    if (response2.ok) {
                        setMessage('Archivo subido y procesado exitosamente.');
                    } else {
                        setMessage(data2.error || 'Error al procesar la imagen.');
                    }
                    console.log(data2);
                } catch (error) {
                    setMessage(error ? 'Error al conectar con el servidor para procesar la imagen.': "");
                }
            };
    
            enviarImagen();
        }
    }, [imagenes]);
    


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const arrayFiles = e.target.files[0];
        setFiles(arrayFiles);
    }

    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!files) {
            setMessage('Por favor selecciona un archivo');
            return;
        }
    
        const formDataone = new FormData();
        formDataone.append('file', files);
    
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formDataone,
            });
        
            const data = await response.json();

            if (response.ok) {
                setMessage('Archivo subido exitosamente.');
            } else {
                setMessage(data.error || 'Error al subir el archivo.');
            }
            const { rutas } = data
            setImagenes(rutas)

        } catch (error) {
            setMessage( error ? 'Error al conectar con el servidor.' : "");
        }
    }


    return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Imágenes Sección 1</h2>
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label 
                    htmlFor="subirimagenes" 
                    className="block text-sm font-medium mb-2"
                >
                    Subir Imágenes para la Sección 1
                </label>
                <input 
                    type="file" 
                    onChange={onChange} 
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
                Subir
            </button>
        </form>
    </div>

    )
}