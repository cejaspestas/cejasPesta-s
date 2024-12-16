// components/TeamDisplay.js
import React, { useState, useEffect } from 'react';
import { Equipo } from '@prisma/client';
import { useData } from '@/context/fetchdatos';
export const TeamDisplay = () => {
  const [dataEquipo , setDataEquipo] = useState<Equipo[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const  { equipo } = useData() ?? {}; 
  useEffect(() => {
    if (equipo) {
      setDataEquipo(equipo);
      setIsLoading(false);
    }
  }, [equipo]);

  if (isLoading) {
      return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="bg-[rgb(12,12,12)] p-6 min-h-[70vh] flex justify-center items-center flex-col gap-y-20">
      <h2 className="text-white text-4xl font-bold text-center mb-6 font-serif">Nuestro Equipo</h2>
      <div className=" w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataEquipo && dataEquipo.map((member, index) => (
          <div
            key={index}
            className="bg-[#141414] hover:bg-orange-600  rounded-lg shadow-md p-4 flex flex-col items-center border-2 border-orange-500"   
          >
            <img
              src={member.rutaImagen}
              alt="Team Member"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold capitalize font-mono text-white">{member.cargo}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};


