"use server";

import { getCookiesToken } from "@/helpers/cookiesToken";

import AccountContainer from "@/components/AccountContainer";

const Account = async () => {
  const token = await getCookiesToken("token");

  return (
    <>
    <AccountContainer  token={token?.value} />
    </>
  );
};

export default Account;
