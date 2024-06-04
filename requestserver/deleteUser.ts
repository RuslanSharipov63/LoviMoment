import { BASE_URL } from "@/basevalue";

export const deleteUser = async (id: string | string[], token: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/author/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success === true) {
      const formData = new FormData();
      if (typeof id === 'string') {
        formData.append("id", id);
      }
      const response = await fetch("/api/deleteuser", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data;
    }
    if (data.success === false) {
      return data;
    }
  } catch (error) {
    const data2 = { success: false };
    return data2;
  }
};
