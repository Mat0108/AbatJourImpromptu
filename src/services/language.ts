import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
export const getLanguage = async () => {
    const res = await axios.get(`${apiUrl}/language`);
    return res
}