import { useContext, useEffect, useState } from "react";
import { getHoraire, HoraireType } from "../../services/horaire";
import Loading from "../Loading/Loading";
import { LanguageContext } from "../languages";

const Horaire = ()=>{
    const [horaire,setHoraire] = useState<HoraireType | null>(null)
    const { dictionnaire } = useContext(LanguageContext);
    useEffect(()=>{
        async function fetchData(){
            const res = await getHoraire()
            if(res.status === 200){
                setHoraire(res.data)
            }
        } 
        fetchData();
    },[])
    function elem(text:string,value:string){
        return <div>
            <p>{text} : {value} </p> 
        </div>
    }
    return <div className="w-[400px] h-[300px] bg-white rounded-lg shadow-xl flex flex-col  center">
        {!horaire && <Loading />}
        {horaire && <div className="w-[80%] ml-[10%] flex ">
                <div className="w-[40%] flex flex-col">
                    <p>{dictionnaire.horaire.lundi}</p>
                    <p>{dictionnaire.horaire.mardi}</p>
                    <p>{dictionnaire.horaire.mercredi}</p>
                    <p>{dictionnaire.horaire.jeudi}</p>
                    <p>{dictionnaire.horaire.vendredi}</p>
                    <p>{dictionnaire.horaire.samedi}</p>
                    <p>{dictionnaire.horaire.dimanche}</p>
                </div>
                <div className="w-[40%] flex flex-col capitalize">
                    <p>{horaire.lundi ?? dictionnaire.horaire.close}</p>
                    <p>{horaire.mardi ?? dictionnaire.horaire.close}</p>
                    <p>{horaire.mercredi ?? dictionnaire.horaire.close}</p>
                    <p>{horaire.jeudi ?? dictionnaire.horaire.close}</p>
                    <p>{horaire.vendredi ?? dictionnaire.horaire.close}</p>
                    <p>{horaire.samedi ?? dictionnaire.horaire.close}</p>
                    <p>{horaire.dimanche ?? dictionnaire.horaire.close}</p>
                </div>
            </div>}
            {horaire && <div className="w-[80%] ml-[10%] mt-2 font-mt-bold">{horaire.special_horaire}</div>}

    </div>


}

export default Horaire;