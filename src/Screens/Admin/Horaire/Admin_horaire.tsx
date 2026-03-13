import { useContext, useEffect, useState } from "react";
import Loading from "../../../Component/Loading/Loading";
import { getHoraire, HoraireType, updateHoraire } from "../../../services/horaire";
import {  useLanguage } from "../../../Component/languages";
import InputString from "../../../Component/Inputs/InputString";
import InputDate from "../../../Component/Inputs/InputDate";
import { toast } from "react-toastify";

const Admin_horaire= ()=>{
 const [horaire,setHoraire] = useState<HoraireType | null>(null)
    const { dictionnaire } =  useLanguage()
    useEffect(()=>{
        async function fetchData(){
            const res = await getHoraire()
            if(res.status === 200){
                setHoraire(res.data)
            }
        } 
        fetchData();
    },[])

    async function update() {
        if(horaire){
            const res = await updateHoraire(horaire)
            if(res.status === 200){
                toast.info("Les horaires ont bien été bien mise a jour !")
            }
        }
        }
    return <div className="w-[600px] h-[500px] bg-spaceBlue rounded-lg shadow-xl flex flex-col  center">
        {!horaire && <Loading />}
        {horaire && <div className="w-[80%] flex gap-4">
            <div className="w-[50%] flex flex-col gap-4">
                <InputString value={horaire.lundi} field="lundi" setValue={setHoraire} isObject title={dictionnaire.horaire.lundi}  classField="font-mt-bold " classDiv="w-fit h-16" disableResize/>
                <InputString value={horaire.mardi} field="mardi" setValue={setHoraire} isObject title={dictionnaire.horaire.mardi}   classField="font-mt-bold " classDiv="w-fit h-16" disableResize/>
                <InputString value={horaire.mercredi} field="mercredi" setValue={setHoraire} isObject title={dictionnaire.horaire.mercredi}   classField="font-mt-bold " classDiv="w-fit h-16" disableResize/>
                <InputString value={horaire.jeudi} field="jeudi" setValue={setHoraire} isObject title={dictionnaire.horaire.jeudi}   classField="font-mt-bold " classDiv="w-fit h-16" disableResize/>
                <InputString value={horaire.vendredi} field="vendredi" setValue={setHoraire} isObject title={dictionnaire.horaire.vendredi}   classField="font-mt-bold " classDiv="w-fit h-16" disableResize/>
            </div>
            <div className="w-[50%] flex flex-col gap-4">
                {/* <InputString value={horaire.samedi} field="samedi" setValue={setHoraire} isObject title={dictionnaire.horaire.samedi}   classField="font-mt-bold " classDiv="w-fit h-16" disableResize warningTitle="empty = fermé"/>
                <InputString value={horaire.dimanche} field="dimanche" setValue={setHoraire} isObject title={dictionnaire.horaire.dimanche}   classField="font-mt-bold " classDiv="w-fit h-16" disableResize/> */}
                <InputDate value={horaire.special_horaire.start}  setValue={(e)=>{setHoraire((prev:any)=>({...prev,["special_horaire"]:{...prev.special_horaire,start: e.target.value}}))}} title={dictionnaire.horaire.from}  classField="font-mt-bold " />
                <InputDate value={horaire.special_horaire.end}  setValue={(e)=>{setHoraire((prev:any)=>({...prev,["special_horaire"]:{...prev.special_horaire,end: e.target.value}}))}} title={dictionnaire.horaire.to }  classField="font-mt-bold "/>
                <div className="h-[143px]"></div>
                <div className="w-full h-fit bg-green px-2 py-1.5 rounded-lg font-mt-bold text-lg text-center mt-6 " onClick={()=>update()}>Mettre a jour </div>
            </div>
                

            </div>}
           

    </div>


}


export default Admin_horaire