import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type InputStringProps = {
    value: string;
    field?: string;
    setValue: Dispatch<SetStateAction<any>>
    placeholder?: string;
    title?: string;
    warningTitle?: string;
    classDiv?:string
    classField?: string;
    classTitle?: string;
    isObject?: boolean;
    disableResize?: boolean;
}
function InputString({value,field,setValue,placeholder,title,warningTitle,classDiv,classField,classTitle,isObject,disableResize}:InputStringProps){
    const ref = useRef<HTMLTextAreaElement>(null);
        useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
    
        if(!disableResize){
            el.style.height = "auto";               
            el.style.height = `${el.scrollHeight}px`;
        } 
    }, [value]);
        return <div className={`${classDiv ? classDiv :"w-full h-fit"}  flex flex-col text-2xs lg:text-base`}> 
            <div className={`${classTitle ?? 'font-mt-bold text-white flex justify-between'}`}><p>{title}</p>{warningTitle && <span className="text-lightRed">{warningTitle}</span>}</div>
            <textarea ref={ref} value={value} onChange={e=>setValue((prev: any) => (isObject && field ?  { ...prev, [field]: e.target.value }:e.target.value ))} placeholder={placeholder} className={`bg-white rounded-lg p-2 ${classField ?? 'font-mt-bold'}`} />
        </div>
}

export default InputString;