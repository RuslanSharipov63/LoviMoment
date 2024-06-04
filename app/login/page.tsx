import { setCookiesApp } from "@/helpers/cookiesToken";
import LoginComponent from "@/components/LoginComponent";



const Login = async () => {

  const getToken = async (token: string) => {
    "use server";
    let tokenValue = "";
    tokenValue = await token;
    await setCookiesApp("token", tokenValue);
    return tokenValue;
  };

  return (
    <>
      <LoginComponent getToken={getToken} />
    </>
  );
};

export default Login;
