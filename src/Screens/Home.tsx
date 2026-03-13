import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import {  useLanguage } from "../Component/languages";
import Navbar from "../Component/navbar/navbar";
import Grid from "../Component/grid/grid/grid";
type HomeProps = {

}
const Home = ({}:HomeProps)=>{
    const { dictionnaire } =  useLanguage()

    

    return <div>
        <div className="w-full h-fit flex flex-col center bg-white border-4 border-lg">
            <div className="w-[95%] sm:w-[60%] h-full p-4 flex flex-col gap-2">
                <p className="text-base lg:text-4xl text-red uppercase">{dictionnaire.apropos}</p>
                <p className="text-2xs lg:text-xl text-justify">{dictionnaire.home.text1}</p>
                <p className="text-2xs lg:text-xl text-justify">{dictionnaire.home.text2}</p>
            </div>
            <div className="w-[95%] sm:w-[60%]"><Grid canEdit={false} gridId="grid-home"/></div>

        </div>
    </div>
}

export default Home