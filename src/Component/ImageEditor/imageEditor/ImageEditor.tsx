import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addImageToGrid, createNewImage, getImageNotPresentInGrid, GridType } from "../../../services/grid";

import InputImage from "../../Inputs/InputFile";
import { toast } from "react-toastify";
import ImageEditorElem from "../imageEditorElem/imageEditorElem";
import { usePopup } from "@/Component/popup/PopupContext";
type ImageEditorProps = {
    gridId: string;
    setReload: Dispatch<SetStateAction<any>>;
}

const ImageEditor = ({gridId,setReload}:ImageEditorProps) =>{
    const [images,setImages] = useState<GridType[]>()
    const [selectedImages,setSelectedImages] = useState<number[]>([]);
    const [files,setFiles] = useState<File[] | undefined>();
    const { closePopup } = usePopup();
    useEffect(()=>{
        async function fetchData(){
            const res = await getImageNotPresentInGrid({gridId})
            if(res.status === 200){
                setImages(res.data)
            }
        }
        fetchData()
    },[])
    const onSelectedChange = (e:any) => {
            let _selectedImages = [...selectedImages];

            if (e.checked)
                _selectedImages.push(e.value);
            else
                _selectedImages.splice(_selectedImages.indexOf(e.value), 1);

            setSelectedImages(_selectedImages);
    }
    const onSelectedClick = (e:number)=>{
    
        let _selectedImages = [...selectedImages];
        if(_selectedImages.includes(e)){
            _selectedImages.splice(_selectedImages.indexOf(e), 1);

        }else{
            _selectedImages.push(e);            
        }

        setSelectedImages(_selectedImages);
    }
    useEffect(()=>{
        async function sendData(files:File[],data:GridType[]){
            let res = await createNewImage({files,data,gridId:gridId ?? "grid-home"})
            if(res.status === 200){
                toast.info("L'image a bien été ajouté")
                setFiles(undefined)
                setReload(true);
                closePopup();
            }
        }
        if(files && files.length > 0){
            let data = files.map((elem,pos)=>{return {w:2,h:2}})
            sendData(files,data)
        }
    },[files])

    async function addImage(){
        if(images && images?.length > 0 && selectedImages && selectedImages.length > 0){
            let data = selectedImages.map(pos=>{
                let item = images[pos]
                return {imageId:item._id,gridId:gridId}
            })
            let res = await addImageToGrid(data)
            if(res.status === 207){
                toast.info("Les image ont bien été ajouté")
                setReload(true);
                closePopup()
            }
        
        }
        
    }
    return <div className="w-[80vw] h-fit min-h-[400px] bg-spaceBlue flex flex-col center p-2 rounded-3xl ">
        <div className="text-white font-mt-bold text-lg">Image non présente dans cette grille </div>
        <div className="w-full h-fit flex gap-4 center flex-wrap p-4">
            {images && images.map((image,pos)=><ImageEditorElem image={image.image} pos={pos} onSelectedChange={onSelectedChange} onSelectedClick={onSelectedClick} selectedImages={selectedImages}  />)}
            {images?.length === 0 && <div className="font-mt-bold text-white text-2xl py-12">toutes les images sont présentes dans la grille</div>}
        </div>
        <div className="w-full flex center gap-4">
            {images?.length !== 0 && <div className="w-fit p-2 bg-green rounded-lg text-lg font-mt-bold" onClick={()=>{addImage()}}>Ajouter les images sélectionné</div>}
            <div>
                <InputImage value={files} setValue={setFiles} title="" placeholder='Ajouter un image' multiple={true} classField='bg-green font-mt-bold' id="0"  />
            </div>
        </div>
    </div>
}

export default ImageEditor