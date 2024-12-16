"use client";
import React, { useState } from "react";

export const VideosCrear = () => {
  const [video, setVideo] = useState({
    videoRuta: "",
    titulo: "",
    descripcion: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/modifapi/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(video),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el video");
      }

      console.log("Video guardado exitosamente");
      setVideo({
        videoRuta: "",
        titulo: "",
        descripcion: "",
      });
    } catch (error) {
      console.error("Error al guardar el video:", error);
    }
  };

  return (
    <div className=" bg-gray-900 flex flex-col justify-center items-center text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Crear Video</h1>
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <div>
          <label htmlFor="videoRuta" className="block text-sm font-medium mb-2">
            Ruta del Video:
          </label>
          <input
            type="text"
            id="videoRuta"
            name="videoRuta"
            value={video.videoRuta}
            onChange={onChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium mb-2">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={video.titulo}
            onChange={onChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium mb-2">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={video.descripcion}
            onChange={onChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Guardar Video
        </button>
      </form>
    </div>
  );
};