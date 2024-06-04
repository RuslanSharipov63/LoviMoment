import { BASE_URL } from "@/basevalue";
import { getCookiesToken } from "@/helpers/cookiesToken";

export const dataUploadPhoto = async (
  infoAboutPhoto: {
    imageURL: string;
    tags: string;
    size: string;
    user: string;
  },
  selectedFile: Blob | null, token: string | undefined
) => {
  const JSONdata = await JSON.stringify(infoAboutPhoto);
  try {

    const response = await fetch(`${BASE_URL}/photo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSONdata,
    });
    const data = await response.json();

      if (data.hasOwnProperty("user")) {
          const formData = await new FormData();
          if (selectedFile) {
            formData.append("file", selectedFile);
            formData.append("id", infoAboutPhoto.user)
          }
          const response2 = await fetch("/api/uploadphoto", {
            method: "POST",
            body: formData,
          });
          const data2 = await response2;
          return data2;
        }
        if (!data.hasOwnProperty("message")) {
          return JSON.stringify({ message: "ошибка сервера" });
        }
      } 
   catch (error) {
    return JSON.stringify({ message: "ошибка сервера" });
  
  }
};
