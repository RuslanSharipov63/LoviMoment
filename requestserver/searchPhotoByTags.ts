import { BASE_URL } from "@/basevalue"

export const searchPhotoByTags = async (tags: string | string[]) => {
    const searchtags = tags;
    
    try {
        const response = await fetch(`${BASE_URL}/search/${searchtags}`);
        const data = await response.json();
        return data;
    } catch (error) {
        const dataError = { success: false }
        return dataError;
    }


}