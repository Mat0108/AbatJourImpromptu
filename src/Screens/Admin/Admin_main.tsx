import { Link } from "react-router";
import Check_Connect from "./Check_Connect";
export type UserProps = {
    user:{
        login:string;
        password:string;
        isLogin:boolean;
    }
}
const AdminMain = () =>{
    Check_Connect()
    return <div className="w-screen h-screen flex flex-col gap-8 center bg-mainColor p-10">
        
        <Link to="/admin/home" className="w-1/2 h-[70px] bg-spaceBlue flex items-center justify-between p-2 rounded-lg font-mt-bold text-[18px] text-white hover:cursor-pointer">
            <p>Grille image Home</p><p className="text-[40px]">{">"}</p>
        </Link>
    </div>
}

export default AdminMain;