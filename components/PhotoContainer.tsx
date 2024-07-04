"use client";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import PhotoComponent from "./PhotoComponent";
import PhotoListContainer from "./PhotoListContainer";
import { getOnePhotoById } from "@/requestserver/getOnePhotoById";
import { PhotoType } from "@/typesApp";
import TitleComponent from "./TitleComponent";
import ProgressComponent from "./ProgressComponent";

type PhotoContainerProp = {
  token?: string;
};

const PhotoContainer: FC<PhotoContainerProp> = ({ token }) => {
  const [checkUpdatePhoto, setCheckUpdatePhoto] = useState<boolean>(false);
  const [photo, setPhoto] = useState<PhotoType>();

  const toggleCheckUpdatePhoto = () => {
    setCheckUpdatePhoto(true);
  };

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const wrapperGetOnePhotoById = async () => {
      const onePhoto = await getOnePhotoById(id);
      setPhoto(onePhoto);
    };
    wrapperGetOnePhotoById();
  }, [id]);

  useEffect(() => {
    if (checkUpdatePhoto) {
      const wrapperGetOnePhotoById = async () => {
        const onePhoto = await getOnePhotoById(id);
        setPhoto(onePhoto);
      };
      wrapperGetOnePhotoById();
    }
  }, [checkUpdatePhoto]);

  return (
    <>
      {photo === undefined ? (
        <ProgressComponent />
      ) : photo?.message === "Фотография не найдена" ? (
        "Фотография не найдена"
      ) : (
        <PhotoComponent photo={photo} token={token} toggleCheckUpdatePhoto={toggleCheckUpdatePhoto}/>
      )}

      <TitleComponent textTitle={"Фотографии автора"} />
    </>
  );
};

export default PhotoContainer;
