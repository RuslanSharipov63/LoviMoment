"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useEffect, FC, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModalWindowForUpdateUserAccount from "./ModalWindowForUpdateUserAccount";
import { sendUserData } from "@/requestserver/sendUserData";
import ModalWindowForDeleteAccount from "./ModalWindowForDeleteAccount";
import { deleteUser } from "@/requestserver/deleteUser";

type UserType = {
  token?: string;
};

const UserAccount: FC<UserType> = ({ token }) => {
  const [user, setUser] = useState({
    _id: "",
    avatarUrl: "",
    fullName: "",
    email: "",
  });

  const [checkUpdate, setCheckUpdate] = useState(false);
  const [checkDeleteUser, setCheckDeleteUser] = useState(false);

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!token) {
      router.push(`/login`);
      return;
    }

    const getUserData = async () => {
      const userData = await sendUserData(id);
      setUser(userData);
      return;
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (checkUpdate) {
      const getUserData = async () => {
        const userData = await sendUserData(id);
        setUser(userData);
        return;
      };

      getUserData();
    }
  }, [checkUpdate]);

  const toggleCheckUpdate = () => {
    setCheckUpdate(true);
  };

  const redirectAfterUserDelete = () => {
    router.push("/login");
  };

  const deleteAccount = () => {
    const startDeleteUser = async () => {
      const response = await deleteUser(id, token);
      if (response.success === true) {
        setCheckDeleteUser(true);
        setTimeout(redirectAfterUserDelete, 3000);
        return;
      }
      if (response.success === false) {
        alert("bad");
        return;
      }
    };
    startDeleteUser();
  };

  return (
    <Card className="m-2 h-100 w-full sm:w-52 mr-6">
      <CardHeader>
        <CardTitle className="text-center">профиль</CardTitle>
        {checkDeleteUser && (
          <CardDescription>
            Аккаунт удален. Вы будете перенаправлены на страницу входа
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col justify-between items-center">
        <Avatar>
          <AvatarImage src={`/image/accounts/${user._id}/${user.avatarUrl}`} />
          <AvatarFallback>нк</AvatarFallback>
        </Avatar>
        <p className="mt-2 mb-4">{user.fullName}</p>
        <p className="mt-2 mb-2">{user.email}</p>
      </CardContent>
      <CardFooter className="flex flex-col justify-between items-center">
        {user._id && (
          <ModalWindowForUpdateUserAccount
            user={user}
            pathImg={"/image/accounts"}
            token={token}
            toggleCheckUpdate={toggleCheckUpdate}
          />
        )}
        <ModalWindowForDeleteAccount deleteAccount={deleteAccount} />
      </CardFooter>
    </Card>
  );
};

export default UserAccount;
