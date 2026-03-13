import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { getHoraire, HoraireType } from "../../../services/horaire";
import Loading from "../../Loading/Loading";
import {  useLanguage } from "../../languages";
import moment from 'moment'
import { usePopup } from "../PopupContext";
const Information = ()=>{
    const [horaire,setHoraire] = useState<HoraireType | null>(null)
    const { dictionnaire } =  useLanguage()
    const {closePopup} = usePopup();
    useEffect(()=>{
        async function fetchData(){
            const res = await getHoraire()
            if(res.status === 200){
                setHoraire(res.data)
            }
        } 
        fetchData();
    },[])
    function isClose(value:string){
        return value && value !== "" ? value :  dictionnaire.horaire.close
    }
    const mapsUrl =  "https://www.google.com/maps/place/Abat+jour+Impromptu+-+Philippe+Lempérière/@48.878331,2.2935318,14.62z/data=!4m6!3m5!1s0x47e66f95cc517725:0x27935cd850f4cc12!8m2!3d48.8814935!4d2.2989209!16s%2Fg%2F1v2gd1l5?entry=tts&g_ep=EgoyMDI2MDIyMi4wIPu8ASoASAFQAw%3D%3D&skid=2f894a08-918a-4479-89b8-caa6f3e06b93";
    return <div className="w-[300px] lg:w-[780px] p-2 text-2xs lg:text-base bg-white rounded-lg shadow-xl flex flex-col  center ">
        {!horaire && <Loading />}
        {horaire && <div className="w-full p-4 p-4 relative flex flex-col lg:flex-row gap-1 lg:gap-4">
            <div className="absolute top-0 right-0 " onClick={()=>{closePopup()}}>
                <img src="/images/close.webp" alt="close" className="w-4 h-4"/>
            </div>
            <div className="w-full lg:w-[50%] flex flex-col gap-1 lg:gap-4">
                <div className="flex h-full flex center font-mt-bold border-1 border-black rounded-xl">
                    {dictionnaire.contact.contact} : {dictionnaire.contact.numero}
                </div>
                <div className="flex center h-fit flex flex-col border-1 border-black rounded-xl">
                    <div className="w-full flex center p-1">
                        <div className="w-[40%] flex flex-col ">
                            <p>{dictionnaire.horaire.lundi}</p>
                            <p>{dictionnaire.horaire.mardi}</p>
                            <p>{dictionnaire.horaire.mercredi}</p>
                            <p>{dictionnaire.horaire.jeudi}</p>
                            <p>{dictionnaire.horaire.vendredi}</p>
                            {/* <p>{dictionnaire.horaire.samedi}</p>
                            <p>{dictionnaire.horaire.dimanche}</p> */}
                        </div>
                        <div className="w-[40%] flex flex-col capitalize">
                            <p>{isClose(horaire.lundi)}</p>
                            <p>{isClose(horaire.mardi)}</p>
                            <p>{isClose(horaire.mercredi)}</p>
                            <p>{isClose(horaire.jeudi)}</p>
                            <p>{isClose(horaire.vendredi)}</p>
                            {/* <p>{isClose(horaire.samedi)}</p>
                            <p>{isClose(horaire.dimanche)}</p> */}
                        </div>
                    </div>
                    <div className="mt-1 lg:mt-2 font-mt-bold">{dictionnaire.horaire.from} {moment(horaire.special_horaire.start).format('DD/MM/YY')} {dictionnaire.horaire.to} {moment(horaire.special_horaire.end).format('DD/MM/YY')} </div>
                </div>
        
            </div>
            <div className="w-full lg:w-[50%]">
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-xl overflow-hidden border hover:shadow-lg transition `}
                    aria-label="Ouvrir dans Google Maps"
                    >
                    <iframe
                        title="Carte Abat jour Impromptu"
                        src="https://www.google.com/maps?q=48.8814935,2.2989209&z=17&output=embed"
                        className="w-full h-48 pointer-events-none"
                        loading="lazy"
                    />
                    <div className="bg-white p-3 text-2xs lg:text-sm text-center font-medium">
                         📍 {dictionnaire.horaire.maps}
                    </div>
                    </a>
            </div>
        </div>}
    </div>


}

export default Information;