"use client";
import { useData } from "@/context/fetchdatos";
import { Video } from "@prisma/client";
import { useEffect, useState } from "react";

// Función para transformar URLs a formato embed, incluyendo Shorts de YouTube
const transformUrlToEmbed = (url: string): string => {
    // Verificar si la URL es de YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("shorts")) {
        let videoId;
        if (url.includes("youtube.com")) {
            if (url.includes("/shorts/")) {
                videoId = url.split("/shorts/")[1]?.split("?")[0];
            } else {
                videoId = url.split("v=")[1]?.split("&")[0];
            }
        } else if (url.includes("youtu.be")) {
            videoId = url.split("youtu.be/")[1]?.split("?")[0];
        }

        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    // Verificar si la URL es de Facebook
    if (url.includes("facebook.com")) {
        const encodedUrl = encodeURIComponent(url);
        return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false`;
    }

    // Si no coincide con YouTube, Shorts o Facebook
    return "";
};

export const Datavideos = ({ count }: { count: number }) => {
    const [dataVideo, setDataVideo] = useState<Video[]>([]);
    const { videos } = useData() ?? {};

    useEffect(() => {
        if (videos) {
            setDataVideo(videos);
        }
    }, [videos]);

    const countdataVideo = dataVideo.slice(0, count);

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6 lg:p-8">
            {countdataVideo.length > 0 ? (
                countdataVideo.map((ele, i) => (
                    <div
                        key={i}
                        onClick={() => window.open(ele.videoRuta, "_blank")}
                        className="group bg-bgtecer p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        {ele.videoRuta ? (
                            <div className="relative w-full overflow-hidden rounded-md" style={{ paddingTop: "56.25%" }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={transformUrlToEmbed(ele.videoRuta)}
                                    title={ele.titulo || "Video sin título"}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">
                                No se pudo cargar el video.
                            </p>
                        )}
                        <div className="mt-4">
                            <h2 className="text-lg text-textprin font-bold font-mono mb-2 group-hover:text-texthover transition-colors duration-300">
                                {ele.titulo || "Sin título"}
                            </h2>
                            <p className="text-textprin text-sm mb-4 font-mono">
                                {ele.descripcion || "Sin descripción"}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-400 text-center">No hay videos disponibles.</p>
            )}
        </div>
    );
};
