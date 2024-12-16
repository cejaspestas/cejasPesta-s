"use client";
import { useState, useEffect } from "react";
import { Fecha } from "@prisma/client";
import { useData } from "@/context/fetchdatos";

export const FechaCrear = () => {
  const [dataFecha, setDataFecha] = useState<Fecha[]>([]);
  const [message, setMessage] = useState("");
  const [datosInput, setDatosInput] = useState<Omit<Fecha, "id" | "createdAt">>({
    fInicio: "",
    fFinal: "",
  });
  const {fecha } = useData() ?? {};

  useEffect(() => {
    if (fecha) {
      setDataFecha(fecha);
    }
  }, [fecha]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (dataFecha && dataFecha.length > 1) {
        setMessage( "Ya hay una fecha creada");
        return
      }
      if (!datosInput.fInicio || !datosInput.fFinal) {
        setMessage("Todos los campos son obligatorios");
        return;
      }
      const response = await fetch("/api/fecha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fInicio: datosInput.fInicio,
          fFinal: datosInput.fFinal,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/fecha/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el sorteo");
      }

      setMessage("fecha eliminado correctamente");
      // Actualizar la lista de fechas después de eliminar
    } catch (error) {
      setMessage(error ? "Error al eliminar la fecha": "");
    }
  };

  return (
    <section className="p-8 bg-gray-700 min-h-screen">
      <div className="mb-10 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Crear Fecha</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              onChange={onChange}
              type="date"
              name="fInicio"
              placeholder="Fecha inicio"
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              onChange={onChange}
              type="date"
              name="fFinal"
              placeholder="Fecha finales"
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Crear
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-center text-green-600">{message}</p>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Mostrar Fechas</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Fecha Inicio</th>
              <th className="p-2 border">Fecha Final</th>
              <th className="p-2 border">Creado</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataFecha.map((item, i) => (
                <tr key={i} className="odd:bg-white even:bg-gray-100">
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{new Date(item.fInicio).toLocaleDateString()}</td>
                <td className="p-2 border">{new Date(item.fFinal).toLocaleDateString()}</td>
                <td className="p-2 border">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="p-2 border">
                    <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                    >
                    Eliminar
                    </button>
                </td>
                </tr>
            ))}
          </tbody>

        </table>
      </div>
    </section>
  );
};
