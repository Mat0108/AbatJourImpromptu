import { Link } from "react-router";
import Check_Connect from "./Check_Connect";
import { Dispatch, SetStateAction } from "react";
import Admin_horaire from "./Horaire/Admin_horaire";
import { usePopup } from "@/Component/popup/PopupContext";
export type UserProps = {
    user:{
        login:string;
        password:string;
        isLogin:boolean;
    }
}
type AdminMainProps = {
}
const AdminMain = ({}:AdminMainProps) =>{
    Check_Connect();
    const isMobile = window.screen.width < 600;
    const {openPopup} = usePopup();
    return <div className="w-screen h-screen flex flex-col gap-8 center bg-mainColor p-10">
        
        <Link to="/admin/home" className="w-1/2 h-[70px] bg-spaceBlue flex items-center justify-between p-2 rounded-lg font-mt-bold text-[18px] text-white hover:cursor-pointer">
            <p>Grille Home</p><p className="text-[40px]">{">"}</p>
        </Link>
        <Link to="/admin/traditionnel" className="w-1/2 h-[70px] bg-spaceBlue flex items-center justify-between p-2 rounded-lg font-mt-bold text-[18px] text-white hover:cursor-pointer">
            <p>Grille Traditionnel</p><p className="text-[40px]">{">"}</p>
        </Link>
        <Link to="/admin/contemporain" className="w-1/2 h-[70px] bg-spaceBlue flex items-center justify-between p-2 rounded-lg font-mt-bold text-[18px] text-white hover:cursor-pointer">
            <p>Grille Contemporain</p><p className="text-[40px]">{">"}</p>
        </Link>
        <Link to="/admin/appliques" className="w-1/2 h-[70px] bg-spaceBlue flex items-center justify-between p-2 rounded-lg font-mt-bold text-[18px] text-white hover:cursor-pointer">
            <p>Grille Appliques</p><p className="text-[40px]">{">"}</p>
        </Link>
        {isMobile ? <Link to="/admin/horaire" className="w-1/2 h-[70px] bg-spaceBlue flex items-center justify-between p-2 rounded-lg font-mt-bold text-[18px] text-white hover:cursor-pointer">
            <p>Horaire</p><p className="text-[40px]">{">"}</p>
        </Link>:<div onClick={()=>{openPopup(<Admin_horaire/>)}} className="w-1/2 h-[70px] bg-spaceBlue flex items-center justify-between p-2 rounded-lg font-mt-bold text-[18px] text-white hover:cursor-pointer">
            <p>Horaire</p><p className="text-[40px]">{">"}</p>
        </div> 
    }
    </div>
}

export default AdminMain;