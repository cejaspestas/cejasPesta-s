import { Datavideos } from "@/components/dataVideos/datavideos";

export const VideosHome = () => {
    return (
        <div className="relative  bg-gradient-to-b from-gray-950 to-black overflow-hidden h-[210vh] md:h-[150vh] lg:h-[100vh] flex items-center justify-center border-b-2 border-white">
            <div className="w-[80%] h-[80%] flex flex-col justify-between gap-y-5">
                {/* Cabecera */}
                <div className="relative w-full h-[20%] flex items-center justify-center">
                    <div className="relative w-[60%] h-full flex flex-col items-center justify-center">
                        <svg
                            viewBox="0 0 800 200"
                            className="w-full h-[50%]"
                        >
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-[10rem] font-bold fill-none stroke-white stroke-2 font-serif"
                            >
                                VIDEOS
                            </text>
                        </svg>

                        <h1 className="text-6xl font-bold font-serif absolute text-white">Videos</h1>
                    </div>
                </div>

                {/* Contenedor de videos */}
                <div className="w-full h-[80%] overflow-auto">
                    <Datavideos count={5} />
                </div>
            </div>
        </div>
    );
};

