import { BASE_URL } from "@/basevalue";

export const getOnePhotoById = async (id: string | string[]) => {
  const response = await fetch(`${BASE_URL}/photo/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
