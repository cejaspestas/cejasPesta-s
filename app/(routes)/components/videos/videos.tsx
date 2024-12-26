import { Datavideos } from "@/components/dataVideos/datavideos";

export const VideosHome = () => {
    return (
        <div className="relative  bg-bgsecond overflow-hidden h-[120vh] md:h-[150vh] lg:h-[100vh] flex items-center justify-center border-2 border-black">
            <div className="w-[90%] h-[90%] flex flex-col justify-between gap-y-5">
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
                                className="text-[15rem] font-bold fill-none stroke-black stroke-2 font-serif"
                            >
                                VIDEOS
                            </text>
                        </svg>

                        <h1 className="text-6xl font-bold font-serif absolute text-white">Videos</h1>
                    </div>
                </div>
                <div className="w-full h-[80%] overflow-auto dark-scrollbar">
                    <Datavideos count={-1} />
                </div>

            </div>
        </div>
    );
};

