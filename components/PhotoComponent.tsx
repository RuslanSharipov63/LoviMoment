"use client";
import useDownloader from "react-use-downloader";
import { PhotoType } from "@/typesApp";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ModalWindowComponent from "./ModalWindowComponent";
import AlertComponent from "./AlertComponent";
import ModalWindowForUpdateTagsComponent from "./ModalWindowForUpdateTagsComponent";

type PhotoComponentProp = {
  photo: PhotoType | undefined;
  token?: string;
  toggleCheckUpdatePhoto: () => void;
};

const PhotoComponent: FC<PhotoComponentProp> = ({ photo, token, toggleCheckUpdatePhoto }) => {
  
  const [checkDelete, setCheckDelete] = useState<{
    succes: boolean;
    text: string;
  }>({ succes: false, text: "" });
  const { download } = useDownloader();

  const toggleDelete = (succesParam: boolean, textParam: string) => {
    setCheckDelete({ succes: succesParam, text: textParam });
  };

  const funcDownloadPhoto = () => {
    const arrForName =
      `/image/uploads/${photo?.user._id}/${photo?.imageURL}`.split(".");
    const fileExtension = arrForName?.[arrForName.length - 1];
    if (photo?.user.avatarUrl) {
      download(
        `/image/uploads/${photo?.user._id}/${photo?.imageURL}`,
        `file.${fileExtension}`
      );
      return;
    }
  };

  return (
    <>
      {checkDelete.succes && (
        <AlertComponent
          textTitle={"результат удаления"}
          textDescription={checkDelete.text}
        />
      )}
      <div className="flex flex-col mt-2 md:flex-row p-2">
        <div className="flex-1 mb-2">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={`/image/uploads/${photo?.user._id}/${photo?.imageURL}`}
              alt="фото автора"
              fill
              className="rounded-md object-contain"
              id={photo?.user._id}
            />
          </AspectRatio>
        </div>
        <div>
          <Card className="flex-none w-64 m-0 m-auto md:ml-2 md:mt-0 p-1">
            <CardContent>
              <Avatar>
                <AvatarImage
                  src={`/image/accounts/${photo?.user._id}/${photo?.user.avatarUrl}`}
                />
                <AvatarFallback>нк</AvatarFallback>
              </Avatar>
              <p>автор {photo?.user.fullName}</p>
              <p>email: {photo?.user.email}</p>
              <hr className="mb-2 mt-2" />
              <p>
                размер: {photo?.size && (photo?.size / 1024 / 1024).toFixed(2)}{" "}
                Мб
              </p>
              <p>теги: {photo?.tags}</p>
            </CardContent>
            <CardFooter className="flex justify-between flex-col">
              <Button className="mt-4 w-36" onClick={funcDownloadPhoto}>
                Скачать
              </Button>
              {token && (
                <>
                  <ModalWindowComponent
                    fileName={`/image/uploads/${photo?.user._id}/${photo?.imageURL}`}
                    token={token}
                    id={photo?._id}
                    toggleDelete={toggleDelete}
                    userId={photo?.user._id}
                  />
                  <ModalWindowForUpdateTagsComponent
                    tags={photo?.tags}
                    id={photo?._id}
                    token={token}
                    toggleCheckUpdatePhoto={toggleCheckUpdatePhoto}
                  />
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PhotoComponent;
