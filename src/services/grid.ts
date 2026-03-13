import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
export type GridElemType = {
    w:number;
    h: number;
    x?: number;
    y?: number;
    gridId?:string;
    description?: string;
}
export type GridType = {
    _id?: any,
    image?: string;
    grid: GridElemType[]
}
export type GridResponse = {
    status: number,
    data?: GridType[]
}
export const getGrid= async (grid:string) => {
    const res = await axios.get(`${apiUrl}/grid/${grid}`);
    return res
}
export const getImageNotPresentInGrid = async ({gridId}:{gridId:string})=>{
    const res = await axios.post(`${apiUrl}/grid/${gridId}/getImageNotPresent`)
    return res;
}
export const updateGridPos = async (body: any) =>{
    const res = await axios.post(`${apiUrl}/grid/update`,body)
    return res
}
export const createNewImage = async({files,data,gridId}:{files:File[],data:GridType[],gridId:string})=>{
    const form = new FormData();
    files.forEach((file) => {
        form.append('files', file); 
    });
    form.append('data',JSON.stringify(data));
    form.append('gridId',gridId)
    const res = await axios.post(`${apiUrl}/grid/createMulti`,form,{headers: { "Content-Type": "multipart/form-data" }})
    return res;
}
export const addImageToGrid= async(data:{imageId:string,gridId:string}[])=>{
    const form = new FormData();
    form.append('items',JSON.stringify(data));
    const res = await axios.post(`${apiUrl}/grid/addImages`,{items:data})
    return res;
}

export const deleteImage = async({imageId}:{imageId:string})=>{
    const res = await axios.delete(`${apiUrl}/image/${imageId}`);
    return res;
}

export const removeImageFromGrid = async({imageId,gridId}:{imageId:string,gridId:string})=>{
    const res = await axios.post(`${apiUrl}/grid/${gridId}/removeImage`,{imageId});
    return res;
}


export const updateDescription = async({imageId,gridId,description}:{imageId:string,gridId:string,description:string})=>{
    const res = await axios.post(`${apiUrl}/image/${imageId}/updateDescription`,{description,gridId })
    return res;
}
