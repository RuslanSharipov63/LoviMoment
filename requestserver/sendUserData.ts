import { BASE_URL } from "@/basevalue";

export async function sendUserData (id: string | string[] | undefined) {
    const res = await fetch(`${BASE_URL}/account/${id}`);
      const data = await res.json();
      return data;
}