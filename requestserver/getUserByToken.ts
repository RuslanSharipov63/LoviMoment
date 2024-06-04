"use server";
import { BASE_URL } from "@/basevalue";

export const getUserByToken = async (token?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 10,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return JSON.stringify({ message: false });
  }
};
