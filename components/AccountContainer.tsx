"use client";
import { FC, useState, useEffect, useCallback, useMemo } from "react";
import styles from './../app/ui/Account.module.css';
import Link from "next/link";
import TitleComponent from "@/components/TitleComponent";
import UserAccount from "@/components/UserAccount";
import AddPhoto from "@/components/AddPhoto";
import PhotoListContainer from "./PhotoListContainer";


type AccountContainerProp = {
  token?: string;
};

const AccountContainer: FC<AccountContainerProp> = ({ token }) => {
  const [addPhoto, setAddPhoto] = useState(false);

  const checkAddPhoto = () => {
    setAddPhoto(!addPhoto);
  };

 

  return (
    <> 
        <div
        className={styles.containerAccount}
        style={{ backgroundImage: "url(/fon.jpg)" }}
      >
    <UserAccount token={token} />
    <AddPhoto textbtn={"добавить"} token={token} checkAddPhoto={checkAddPhoto} />
    </div> )
      <Link
        className="mr-2 text-right"
        href="https://ru.freepik.com/free-vector/purple-fluid-background-frame_14547781.htm#page=2&query=%D1%84%D0%BE%D0%BD%20%D0%B4%D0%BB%D1%8F%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0&position=11&from_view=keyword&track=ais&uuid=091d69a6-2007-4daf-a12b-16e6ba759825"
      >
        Изображение от rawpixel.com
      </Link>
      <TitleComponent textTitle={"Мои фотографии"} />
      <PhotoListContainer addPhoto={addPhoto} checkAddPhoto={checkAddPhoto} />
    </>
  );
};

export default AccountContainer;
