import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../Component/languages";
import Navbar from "../Component/navbar/navbar";
import Grid from "../Component/grid/grid";
type HomeProps = {
    setPopup: Dispatch<SetStateAction<any>>
    setIsOpenPopup: Dispatch<SetStateAction<any>>
}
const Home = ({setPopup,setIsOpenPopup}:HomeProps)=>{
    const { dictionnaire } = useContext(LanguageContext);
    const backgroundRef = useRef<HTMLDivElement>(null)
    const isMobile = window.screen.width < 600;
    

    return <div>
        <div className="relative" ref={backgroundRef}>
            <img src={"/images/background.webp"} alt="background" className="w-full" />
            <div className="absolute top-1/2 left-0 w-full z-10 font-mt-bold text-white text-center">
            <p className="text-xs sm:text-4xl"> {dictionnaire.impromptu.toUpperCase()}</p>
             <p className="text-3xs sm:text-2xl"> {dictionnaire.home.title}</p>
            </div>
        </div>
        <div className={`sticky top-0 w-full h-fit ${isMobile ? '-mt-[22px]':'-mt-[56px]'} z-50`}>
            <Navbar setPopup={setPopup} setIsOpenPopup={setIsOpenPopup}/>        
        </div>
        <div className="w-full h-fit flex flex-col center bg-white border-4 border-lg">
            <div className="w-[95%] sm:w-[60%] h-full p-4 flex flex-col gap-2">
                <p className="text-base lg:text-4xl text-red uppercase">{dictionnaire.apropos}</p>
                <p className="text-2xs lg:text-xl text-justify">{dictionnaire.home.text1}</p>
                <p className="text-2xs lg:text-xl text-justify">{dictionnaire.home.text2}</p>
            </div>
            <div className="w-[95%] sm:w-[60%]"><Grid canEdit={false} /></div>

        </div>
    </div>
}

export default Home