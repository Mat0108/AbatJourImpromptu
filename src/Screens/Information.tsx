import Horaire from "../Component/popup/information/information";
import Navbar from "../Component/navbar/navbar";

const InformationScreen = ()=>{
    return <div className="w-full h-full flex flex-col flex bg-secondColor ">
        <Navbar/>
            <div className="w-full h-screen flex center">

        <Horaire/>
            </div>
    </div>
}
export default InformationScreen;