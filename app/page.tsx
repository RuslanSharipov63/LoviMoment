import { BASE_URL } from "@/basevalue";
import Image from "next/image";
import Link from "next/link";
import styles from "./../app/ui/PhotoList.module.css";
import { Key } from "react";

async function fetchDataPhotos () {
  try {
    const response = await fetch(`${BASE_URL}/photos`, {
      next: { revalidate: 60 },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    const data = await { success: false };
    return data;
  }
};

export default async function Home() {

  const dataPhotos = await fetchDataPhotos();

  return (
    <>
    <div className={`${styles.containerPhotoList} mt-2`}>
        {!dataPhotos?.hasOwnProperty("message") &&
          dataPhotos.map((item: { _id: Key | null | undefined; user: { _id: any; }; imageURL: any; tags: string; }) => {
            return (
              <div key={item._id} className="mb-2">
                <Link href={`/photo/${item._id}`}>
                  <Image
                    src={`/image/uploads/${item.user}/${item.imageURL}`}
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
    </>
  );
}
