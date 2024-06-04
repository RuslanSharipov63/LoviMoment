import * as React from "react"
import { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Image from "next/image"
import { PhotosType } from "@/typesApp";
import Link from "next/link";
import styles from './../app/ui/PhotoListResultSearch.module.css';

type PhotoListResultSearchProp = {
  photosList: PhotosType;
};

const PhotoListResultSearch: FC<PhotoListResultSearchProp> = ({ photosList }) => {



  return (
<div className={styles.container}> 
      <div className={styles.containerPhotoList}>    
        {photosList.map((item: PhotosType) =>      
           
                <Link href={`/photo/${item._id}`}>
                  <Image
                    src={`/image/uploads/${item.user}/${item.imageURL}`}
                    width={500}
                    height={500}              
                    alt={item.tags}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                    loading="lazy"
                  />
                </Link> 
  )}
      </div>
      </div>

  );
}

export default PhotoListResultSearch;