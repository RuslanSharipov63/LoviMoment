"use client";
import { sendAllPhotoAuthor } from "@/requestserver/sendAllPhotoAuthor";
import { PhotosType } from "@/typesApp";
import { useParams } from "next/navigation";
import { FC, useState, useEffect } from "react";
import PhotoList from "./PhotoList";
import ProgressComponent from "./ProgressComponent";

type PhotoListContainerProp = {
  addPhoto?: boolean;
  checkAddPhoto?: () => void
};

const PhotoListContainer: FC<PhotoListContainerProp> = ({
  addPhoto,
  checkAddPhoto
}) => {
  const [loading, setLoading] = useState(true);
  const [photosList, setPhotos] = useState<PhotosType>({
    message: "",
    photos: {
      _id: "",
      createdAt: "",
      imageURL: "",
      size: "",
      tags: "",
      updatedAt: "",
      user: {
        _id: "",
        avatarUrl: "",
        createdAt: "",
        email: "",
        fullName: "",
        passwordHash: "",
        updatedAt: "",
      },
    },
  });

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getPhotoAuthor = async () => {
      const photoData = await sendAllPhotoAuthor(id);
      setPhotos(photoData);
      setLoading(false);
   
    };

    getPhotoAuthor();

    return () => {
      getPhotoAuthor();
    };
  }, []);

  useEffect(() => {
    const getPhotoAuthor = async () => {
      setLoading(true);
      const photoData = await sendAllPhotoAuthor(id);
      setPhotos(photoData);
      setLoading(false);
      checkAddPhoto?.();
    };

    if (addPhoto) {
      getPhotoAuthor();
      return;
    }
    return () => {
      getPhotoAuthor();
    };
  }, [addPhoto]);

  return (
    <>
      {loading ? <ProgressComponent /> : <PhotoList photosList={photosList}/>}
    </>
  );
};

export default PhotoListContainer;
