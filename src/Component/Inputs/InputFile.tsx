import { Dispatch, SetStateAction, useRef } from "react";

type InputFileProps = {
    value?: File[];
    setValue: Dispatch<SetStateAction<any>>
    placeholder: string;
    title?: string;
    warningTitle?: string;
    classField?: string;
    classTitle?: string;
    multiple?: boolean;
    id:string;
}

function InputImage({value,setValue,placeholder,title,warningTitle,classField,classTitle,multiple,id}:InputFileProps){
        const fileInputRef = useRef<HTMLInputElement>(null)
        const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!e.target.files) return;
        setValue(Array.from(e.target.files || []))
      };

       return <div className="w-full h-fit flex flex-col " >
            {title && <div className={`${classTitle ?? 'font-mt-bold text-white'} flex justify-between`}><p>{title}</p>{warningTitle && <span className="text-lightRed">{warningTitle}</span>}</div>}
            <label htmlFor={`input-file-${id}`} className={`rounded-lg p-2 ${classField ?? 'bg-white font-mt-bold'}`}>{placeholder}</label>
            <input id={`input-file-${id}`} ref={fileInputRef} type="file" accept="image/*" multiple={multiple} onClick={(e) => (e.currentTarget.value = "")} onChange={handleFile} title={placeholder}  className="hidden" />
        </div>
}

export default InputImage;
