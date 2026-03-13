import { Checkbox } from "primereact/checkbox";
import { useState } from "react";

type imageEditorElemProps = {
    image?:string;
    pos:number;
    onSelectedChange:(e:any)=>void;
    onSelectedClick: (e:number)=>void;
    selectedImages: number[];
}
const ImageEditorElem = ({image,pos,onSelectedChange,onSelectedClick,selectedImages}:imageEditorElemProps)=>{
    const [hover,setHover] = useState(false)
    return <div className="w-[200px] h-[200px] flex center " key={`image-${pos}`} onClick={()=>{onSelectedClick(pos)}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}> <div className="relative">
            <img src={image} alt={`image-${pos}`} className={`relative w-full h-fit max-h-[200px]   ${hover ? "border-2 border-hoverColor":"border-2 border-spaceBlue"}`}/>
            <div className="absolute top-2 right-2 z-2">
                <Checkbox name={pos.toString()} value={pos} onChange={onSelectedChange} checked={selectedImages.includes(pos)} />
            </div>
        </div>
    </div>
}

export default ImageEditorElem;