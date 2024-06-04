import { BASE_URL } from "@/basevalue";

type userDataRegistration = {
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
};

export async function sendRegistartion(userData: userDataRegistration) {
  const formData = await new FormData();
  formData.append("fullName", userData.username);
  formData.append("email", userData.email);
  formData.append("avatarUrl", userData.avatarUrl);
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data;
}

export async function uploadUserForRegistration(selectedFile: {
  file?: any;
  id: string;
}) {
  const formData = await new FormData();
  if (selectedFile.file) {
    formData.append("file", selectedFile.file);
  }
  formData.append("id", selectedFile.id);
  const response = await fetch("/api/userupload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export const dataUserFunc = async function sendDataUser(
  dataUser: {
    fullName: string;
    email: string;
    avatarUrl: any;
    password: string;
  },
  selectedFile: Blob | null
) {
  const JSONdata = await JSON.stringify(dataUser);
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });
    const data = await response.json();

    if (data.hasOwnProperty("_id")) {
      const formData = await new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("id", data._id);
      const response2 = await fetch("/api/userupload", {
        method: "POST",
        body: formData,
      });
      const data2 = await response2;
      return data2;
    }
    if (!data.hasOwnProperty("_id")) {
      return JSON.stringify({ message: "ошибка сервера" });
    }
  } catch (error) {
    return {
      text: function () {
        return "ошибка сервера";
      },
    };
  }
};
