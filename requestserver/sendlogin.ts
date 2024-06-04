import { BASE_URL } from "@/basevalue";
type loginData = {
  email: string;
  password: string;
};

export async function sendLogin(loginData: loginData) {
  const JSONdata = JSON.stringify(loginData);
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  });
  const data = await res.json();
  return data;
}
