import moment from "moment";
import { Dispatch, SetStateAction, useRef } from "react";

type InputDateProps = {
    value?: Date;
    setValue: Dispatch<SetStateAction<any>>
    placeholder?: string;
    title?: string;
    warningTitle?: string;
    classField?: string;
    classTitle?: string;
}

function InputDate({value,setValue,placeholder,title,warningTitle,classField,classTitle}:InputDateProps){
    const dateInputRef = useRef<HTMLInputElement>(null);
    console.log('title : ', title)

    return <div className="w-full h-fit flex flex-col ">
        {title && <div className={`${classTitle ?? 'font-mt-bold text-white'} text-white flex justify-between`}><p>{title}</p>{warningTitle && <span className="text-lightRed">{warningTitle}</span>}</div>}
        <input ref={dateInputRef} type="date"  value={moment(value).format("yyyy-MM-DD")}  onChange={setValue} placeholder={placeholder} className={`rounded-lg p-2 bg-white ${classField ?? 'bg-white font-mt-bold'}`} />
    </div>
}

export default InputDate;
