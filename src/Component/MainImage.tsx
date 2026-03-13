import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./navbar/navbar";
import { useLanguage } from "./languages";
import { useLocation } from "react-router";

const MainImage = ()=>{
    
    const { dictionnaire } = useLanguage()
    const backgroundRef = useRef<HTMLDivElement>(null);
    const isMobile = window.screen.width < 600;
    const location = useLocation();

    const element = useMemo(()=>{
        const display = !location.pathname.split("/").includes("admin")
        if(display){
            return <>
            <div className="relative" ref={backgroundRef}>
            <img src={"/images/background.webp"} alt="background" className="w-full" />
            <div className="absolute top-1/2 left-0 w-full z-10 font-mt-bold text-white text-center">
            <p className="text-xs sm:text-4xl"> {dictionnaire.impromptu.toUpperCase()}</p>
             <p className="text-3xs sm:text-2xl"> {dictionnaire.home.title}</p>
            </div>
        </div>
        <div className={`sticky top-0 w-full h-fit ${isMobile ? '-mt-[22px]':'-mt-[56px]'} z-50`}>
            <Navbar />        
        </div>
            </>
        }else{
            return ;
        }
    },[location])
    return element
}
export default MainImage;