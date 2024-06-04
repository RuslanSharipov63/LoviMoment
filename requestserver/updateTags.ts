import { BASE_URL } from "@/basevalue";
export const updateTags = async (dataForUpdatePhoto: { id: string | undefined; token: string; tags: string | undefined; }) => {
    const JSONdata = JSON.stringify(dataForUpdatePhoto);
  try {
    const response = await fetch(`${BASE_URL}/photo`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${dataForUpdatePhoto.token}`,
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });
    const data = response.json();
    return data;
  } catch (error) {
    let data = await {success: false}
    return data;
  }
};
