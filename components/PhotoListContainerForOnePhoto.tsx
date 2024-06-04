"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PhotoList from "./PhotoList";
import { getOnePhotoById } from "@/requestserver/getOnePhotoById";
import { sendAllPhotoAuthor } from "@/requestserver/sendAllPhotoAuthor";
import { PhotosType } from "@/typesApp"

const PhotoListContainerForOnePhoto = () => {

  const [photosList, setPhotoList] = useState<PhotosType>({
    message: '',
    photos: {
      _id: '',
      createdAt: '',
      imageURL: '',
      size: '',
      tags: '',
      updatedAt: '',
      user: {
        _id: '',
        avatarUrl: '',
        createdAt: '',
        email: '',
        fullName: '',
        passwordHash: '',
        updatedAt: '',
      },
    }
  }
  );

  const [checkKeyPhotosList, setCheckKeyPhotosList] = useState<boolean>(false);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const wrapperGetOnePhotoById = async () => {
      const onePhoto = await getOnePhotoById(id);
      console.log(onePhoto)
      if (onePhoto.user._id != undefined) {
        const allPhotoAuthor = await sendAllPhotoAuthor(onePhoto.user._id);
        setPhotoList(allPhotoAuthor);
        return;
      }

    };
    wrapperGetOnePhotoById();
    if (photosList.message != '') {
      setCheckKeyPhotosList(true);
    }
  }, []);

  return (

    checkKeyPhotosList === false ? <p>не удалось загрузить фото</p> : <PhotoList photosList={photosList} />

  );
};

export default PhotoListContainerForOnePhoto;