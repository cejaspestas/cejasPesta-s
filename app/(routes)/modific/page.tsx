"use client";
import { SignOutButton } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function Modific() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="w-[30%] h-[30%] flex items-center justify-center">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[100vh] p-4 bg-gray-800 text-white rounded-md shadow-md flex justify-center items-center flex-col">
            <h1 className="text-xl font-bold mb-4">Modific</h1>
            {user ? (
                <div className="flex flex-col items-center">
                    <h2 className="text-lg mb-2">
                        Hola, {user.firstName || "Usuario"}
                    </h2>
                    <SignOutButton>
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Cerrar Sesión
                        </button>
                    </SignOutButton>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <p className="mb-2">Inicia sesión para continuar</p>
                    <SignIn />
                </div>
            )}
        </div>
    );
}
