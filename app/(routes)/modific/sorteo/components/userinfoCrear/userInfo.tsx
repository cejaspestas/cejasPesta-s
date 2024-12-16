"use client";
import { UserInfo as UserInfoType } from "@prisma/client"; // Renombramos el tipo Prisma
import { useEffect, useState } from "react";
import { useData } from "@/context/fetchdatos";
import { SignOutButton } from '@clerk/nextjs'

export const UserInfo = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfoType[]>([]);
    const { dataUser } = useData() ?? {}
    useEffect(() => {   
        if (dataUser) {
            setUserInfo(dataUser);
        }

    }, [dataUser]);

    const handleDelete = async (num: number) => {
        try {
            const response = await fetch(`/api/sortteos/${num}`, {
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el sorteo");
            }

            setMessage("Sorteo eliminado correctamente");
        } catch (error) {
            setMessage( error ? "Error al eliminar el sorteo" : "");
        }
    };

    return (
        <section className="flex flex-col lg:flex-row justify-center items-center min-h-screen w-full bg-[rgb(15,15,15)] p-4 rounded-lg">
            <SignOutButton />
            <div className="w-full bg-[rgb(30,30,30)] p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">UserInfo - Editar/Eliminar</h2>
                {message && (
                    <div className={`text-center p-2 mb-4 text-white ${message.includes('Error') ? 'bg-red-600' : 'bg-green-600'}`}>
                        {message}
                    </div>
                )}
                <table className="min-w-full bg-white text-sm text-gray-800">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nombre Completo</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Teléfono</th>
                            <th className="px-4 py-2">País</th>
                            <th className="px-4 py-2">Números Seleccionados</th>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo &&
                            userInfo.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-200">
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2">{user.nombreCompleto}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.celular}</td>
                                    <td className="px-4 py-2">{user.pais}</td>
                                    <td className="px-4 py-2">{user.numerosEscogidos}</td>
                                    <td className="px-4 py-2">{user.createdAt as unknown as string}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition"
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
