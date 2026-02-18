import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
export type GridType = {
    _id: any,
    image: string;
    w:number;
    h: number;
    x: number;
    y: number;
    gridId:string;
}
export type GridResponse = {
    status: number,
    data?: GridType[]
}
export const getGrid= async (grid:string) => {
    const res = await axios.get(`${apiUrl}/grid/${grid}`);
    return res
}
export const updateGridPos = async (body: any) =>{
    console.log('body : ', body)
    const res = await axios.post(`${apiUrl}/grid/update`,body)
    return res
}