"use server"
import { cookies } from "next/headers";

export const setCookiesApp = async (cookiesName: string, cookiseParam: string) => {
  return cookies().set(cookiesName, cookiseParam);
};

export const getCookiesToken = async (getNameCookies: string) => {
  const cookieStore = await cookies();
  const token = await cookieStore.get(getNameCookies);
  return token;
};

export const deleteCookiesToken = async () => {
 cookies().delete("token");
}
