
// components/TeamDisplay.js
import React, { useState, useEffect } from 'react';
import { Equipo } from '@prisma/client';
import { useData } from '@/context/fetchdatos';

export const TeamDisplay = () => {
  const [dataEquipo, setDataEquipo] = useState<Equipo[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const { equipo } = useData() ?? {}; // Obtención de datos del contexto

  useEffect(() => {
    if (equipo) {
      setDataEquipo(equipo);
      setIsLoading(false); // Cambiar estado cuando los datos se han cargado
    }
  }, [equipo]);

  // Mostrar mensaje de carga si los datos aún están cargando
  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="bg-bgsecond border-4 border-black p-6 min-h-[65vh] flex justify-center items-center flex-col gap-y-20">
      <h2 className="text-textprin text-4xl font-bold text-center mb-6 font-serif">Nuestro Equipo</h2>
      <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataEquipo &&
          dataEquipo.map((member, index) => (
            <div
              key={index}
              className="bg-bgtecer hover:bg-texthover rounded-lg shadow-md p-4 flex flex-col items-center border-2 border-texthover transition-all duration-300 ease-in-out"
            >
              <img
                src={member.rutaImagen}
                alt={member.cargo} // Usar el nombre del miembro para mejorar la accesibilidad
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold capitalize font-mono text-textprin">
                {member.cargo}
              </h3>
              <p className="text-sm text-textsecond">{member.cargo}</p> {/* Mostrar nombre si está disponible */}
            </div>
          ))}
      </div>
    </div>
  );
};
