import InputString from "@/Component/Inputs/InputString";
import { updateDescription } from "@/services/grid";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePopup } from "../PopupContext";

type DescriptionUpdateProps = {
    imageId: string;
    gridId:string;
    descriptionOrigin?: string;
    setReload:()=>void;
}
const DescriptionUpdate = ({imageId,gridId,descriptionOrigin,setReload}:DescriptionUpdateProps)=>{
    const [description,setDescription] = useState<string>(descriptionOrigin ?? '')
    const {closePopup} = usePopup()
    async function updateData() {
        const res = await updateDescription({imageId,description,gridId})
        if(res.status === 200){
            toast.info("La description a bien été mise a jour")
            closePopup()
            setReload()
        }
    }
    return <div className="bg-spaceBlue p-4 flex gap-4 center">
        <InputString value={description} setValue={setDescription} title="description" classDiv="w-fit h-16" />
        <div className="bg-green h-fit p-2 rounded-lg text-white font-mt-bold mt-[24px]" onClick={()=>updateData()}>Sauvegarder</div>
    </div>
}
export default DescriptionUpdate