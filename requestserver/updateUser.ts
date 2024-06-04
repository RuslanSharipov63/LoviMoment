import { BASE_URL } from "@/basevalue";

export const updateUser = async (
  updateDataUser: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
  },
  selectedFile: Blob,
  token: string
) => {
  const JSONdata = JSON.stringify(updateDataUser);
  try {
    const response = await fetch(`${BASE_URL}/updateprofile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });
    const data = await response.json();
    if (data.success && selectedFile === null) {
      return data;
    }
    if (data.success && selectedFile !== null) {
      const formData = await new FormData();
      formData.append("file", selectedFile);
      formData.append("id", updateDataUser.id);
      const response2 = await fetch("/api/updateuserphoto", {
        method: "POST",
        body: formData,
      });
      const data2 = await response2.json();
      return data2;
    } 
  } catch (error) {
    const dataError = { success: false };
    return dataError;
  }
};
