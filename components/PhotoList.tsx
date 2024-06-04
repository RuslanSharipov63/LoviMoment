"use client";
import { FC } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import styles from "./../app/ui/PhotoList.module.css";
import Link from "next/link";
import { PhotosType } from "@/typesApp";

type PhotoListProp = {
  photosList: PhotosType;
};

const PhotoList: FC<PhotoListProp> = ({ photosList }) => {
  return (
    <>
      {photosList?.message && (
        <Alert>
          <AlertTitle>{photosList.message}</AlertTitle>
        </Alert>
      )}
      <div className={styles.container}>
        {photosList.length === 0 && (
          <Alert>
            <AlertTitle>у автора пока нет фото</AlertTitle>
          </Alert>
        )}
        <div className={styles.containerPhotoList}>
          {!photosList?.hasOwnProperty("message") &&
            photosList.map((item: PhotosType) => {
              return (
                <div key={item._id} className="mb-2">
                  <Link href={`/photo/${item._id}`}>
                    <Image
                      src={`/image/uploads/${item.user._id}/${item.imageURL}`}
                      width={300}
                      height={300}
                      alt={item.tags}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                      loading="lazy"
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default PhotoList;
