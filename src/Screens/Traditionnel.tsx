import Grid from "@/Component/grid/grid/grid";
import {  useLanguage } from "@/Component/languages";
import Navbar from "@/Component/navbar/navbar";
import { useContext, useRef } from "react";

const Traditionnel = ()=>{
        const { dictionnaire } =  useLanguage()
    const backgroundRef = useRef<HTMLDivElement>(null);
    const isMobile = window.screen.width < 600;
    

    return <div>
        <div className="w-full h-fit flex flex-col center bg-white border-4 border-lg">
            <div className="w-[95%] sm:w-[60%] h-full p-4 flex flex-col gap-2">
                <p className="text-base lg:text-4xl text-red uppercase">{dictionnaire.traditionnel.title}</p>
               
            </div>
            <div className="w-[95%] sm:w-[60%]"><Grid gridId="grid-traditionnel" showDescription/></div>
            <div className="w-[95%] sm:w-[60%] h-full p-4 flex flex-col gap-2">
                 <p className="text-2xs lg:text-xl text-justify">{dictionnaire.traditionnel.text}</p>
            </div>
        </div>
    </div>
}
export default Traditionnel;