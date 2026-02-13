import { useContext, useState } from "react";
import { Link } from "react-router"
import { LanguageContext } from "../languages";
import LanguageSelector from "../languages/languageSelector/LanguageSelector";
const MenuElement = ({text,to}:{text:string,to?:string,popup?:Element})=>{
    return (
        <Link className="w-fit p-1 sm:p-4 font-mt text-black hover:bg-red hover:text-white text-3xs sm:text-base " to={to ?? ''}>
            {text}
        </Link>
    )
}
const Navbar = ()=>{
    const { dictionnaire } = useContext(LanguageContext);
    const [isOpen,setIsOpen] = useState(false)

    const isMobile = window.screen.width < 600;
    return (
        <div className="flex bg-white/80">
            {isMobile ? <div className="relative w-full flex center" onClick={()=>{setIsOpen(!isOpen)}}>
                <div className="flex p-1 gap-1 center">
                    <img src={isOpen ? '/images/close.webp' : '/images/menu.webp'} alt="close" className="w-2 h-2" />
                    <p className="text-2xs">{dictionnaire.menu}</p>
                </div>
                
                <div className="absolute right-2 top-0 w-fit h-full flex center"><LanguageSelector/></div>
                {!isOpen ? '': <div className="absolute top-full left-0 w-full flex flex-col bg-white   ">
                    {MenuElement({text:dictionnaire.apropos.toUpperCase(),to:'apropos'})}
                    {MenuElement({text:dictionnaire.navbar.traditionnel.toUpperCase(),to:'traditionnel'})}
                    {MenuElement({text:dictionnaire.navbar.contemporain.toUpperCase(),to:'contemporain'})}
                    {MenuElement({text:dictionnaire.navbar.application.toUpperCase(),to:'application'})}
                    {MenuElement({text:dictionnaire.navbar.surmesure.toUpperCase(),to:"surmesure"})}
                    {MenuElement({text:dictionnaire.navbar.horaires.toUpperCase()})}
                </div>}
            </div>:
            <div className="w-full flex center ">
                {MenuElement({text:dictionnaire.apropos.toUpperCase(),to:'apropos'})}
                {MenuElement({text:dictionnaire.navbar.traditionnel.toUpperCase(),to:'traditionnel'})}
                {MenuElement({text:dictionnaire.navbar.contemporain.toUpperCase(),to:'contemporain'})}
                {MenuElement({text:dictionnaire.navbar.application.toUpperCase(),to:'application'})}
                {MenuElement({text:dictionnaire.navbar.surmesure.toUpperCase(),to:"surmesure"})}
                {MenuElement({text:dictionnaire.navbar.horaires.toUpperCase()})}
                <LanguageSelector />

            </div>}
            
        </div>
    )
}

export default Navbar;