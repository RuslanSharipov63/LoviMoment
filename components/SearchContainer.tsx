"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { searchPhotoByTags } from "@/requestserver/searchPhotoByTags";
import ProgressComponent from "./ProgressComponent";
import { PhotosType } from "@/typesApp";
import PhotoListResultSearch from "./PhotoListResultSearch";
import AlertComponent from "./AlertComponent";


const SearchContainer = () => {
    const params = useParams();
    const tags = params.searchtags;

    const [photosList, setPhotos] = useState<PhotosType>({
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
    });
    const [loading, setLoading] = useState<string>('pending')

    useEffect(() => {
        const getPhotoByTags = async () => {
            const dataPhoto = await searchPhotoByTags(tags);
            setPhotos(dataPhoto);

            if (dataPhoto.success === false) {
                setLoading('rejected')
                return;
            }
            if (dataPhoto.length === 0) {
                setLoading('without result')
                return;
            }
            else {
                setLoading('fullfilled')
                return;
            }

        }
        getPhotoByTags();


    }, [])

    console.log(photosList.length)


    return (
        <>
            {loading === 'pending' && <ProgressComponent />}
            {loading === 'rejected' && <AlertComponent
                textTitle={'ошибка сервера'}
                textDescription={'Попробуйте еще раз'}
            />}
            {loading === 'without result' && <AlertComponent
                textTitle={'ничего не найдено'}
                textDescription={'Попробуйте другие теги'}
            />}

            {loading === 'fullfilled' &&
                <PhotoListResultSearch photosList={photosList} />
            }

        </>
    );
}

export default SearchContainer;