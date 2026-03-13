import { useState } from "react";
import { GridElemType } from "../../../services/grid";
import ImportSVG from "@/Component/utils/importSvg";
import { usePopup } from "@/Component/popup/PopupContext";
import ShowImage from "@/Component/popup/showImage/showImage";
import DescriptionUpdate from "@/Component/popup/description/description";
type gridElemProps = {
    id:string;
    gridId:string;
    image?:string;
    grid?:GridElemType
    canEdit?:boolean
    removeImage: (imageId:string)=>void;
    showDescription?:boolean
    updateDescription: (imageId:string,description?:string)=>void;
}

 const GridElem = ({id,gridId,image,grid,canEdit,removeImage,showDescription,updateDescription}:gridElemProps)=>{
    const [hover,setHover] = useState(false) 
    const {openPopup} = usePopup(); 
    return  <div
          key={id}
          className="grid-stack-item"
          gs-w={grid?.w || 2}
          gs-h={grid?.h || 2}
          gs-x={grid?.x ?? undefined}
          gs-y={grid?.y ?? undefined}
          gs-auto-position={grid?.x === undefined ? "true" : undefined}
          key-id={id}
          onClick={()=>{canEdit ? '':openPopup(<ShowImage src={image} alt={`image-${id}`} />)}}
          
        >
          <div className="grid-stack-item-content bg-white shadow-md rounded flex flex-col items-center justify-center relative " onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
            {image ? (
              <img 
                src={image} 
                alt="Widget" 
                className="w-full h-full object-cover rounded"
                draggable={false} // Important pour ne pas interférer avec le drag de GridStack
              />
            ) : (
              <p>Pas d'image</p>
            )}
            {showDescription && (hover || canEdit) && (grid?.description || canEdit) && <div className="absolute bottom-0 left-0 w-full  flex " >
              <div className="w-full flex relative bg-white opacity-80 font-mt-bold text-lg center">{grid?.description ?? "Description"}</div>
              {canEdit ? <div className="absolute top-0 left-2 h-full flex center" onClick={()=>{updateDescription(id,grid?.description)}}><ImportSVG src="edit" color="#000000" size={[20,20]}/></div>:''}
            </div>}
            {canEdit && <>
            {/* <span className="absolute text-white font-mt-bold text-xl">{id}</span> */}
            <div className='absolute top-2 right-2 w-6 ' onClick={()=>{removeImage(id)}}><ImportSVG 
              src="del"
              color={hover ? "#797575":"#00000000"}
              size={[20,20]}/></div>
              </>}
          </div>
        </div>
}
export default GridElem