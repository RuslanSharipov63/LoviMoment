import { BASE_URL } from "@/basevalue";

export const deletePhoto = async (
  token: string,
  id: string | undefined,
  fileName: string
) => {

  try {
    const response = await fetch(`${BASE_URL}/photo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.message === true) {
      const formData = new FormData();
 
      formData.append("fileName", fileName);
      const responsePhoto = await fetch('/api/deletephoto', {
        method: "POST",
        body: formData,
      });
      const dataResponsePhoto = await responsePhoto.json();
      return dataResponsePhoto;
    }
    return data;
  } catch (error) {
    const data = { message: false }
    return data;
  }
};
