"use server";
import { getCookiesToken } from "@/helpers/cookiesToken";
import PhotoContainer from "@/components/PhotoContainer";
import PhotoListContainerForOnePhoto from "@/components/PhotoListContainerForOnePhoto";

const Photo = async () => {
  const token = await getCookiesToken("token");
  return (
    <>
      <PhotoContainer token={token?.value} />
      <PhotoListContainerForOnePhoto />
    </>
  );
};

export default Photo;
