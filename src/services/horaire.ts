import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
export type HoraireType = {
    lundi:  string;
    mardi: string;
    mercredi: string;
    jeudi: string;
    vendredi: string;
    samedi: string;
    dimanche:string;
    special_horaire:string;
    
}
export const getHoraire = async ()=> {
    const res = await axios.get(`${apiUrl}/horaire/6994792f7fa9f300132403a6`);
    return res
}
