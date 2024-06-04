"use client"
import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePhoto } from "@/requestserver/deletePhoto";
import { useRouter } from "next/navigation";

type ModalWindowComponentProp = {
  fileName: string;
  token: string;
  id?: string | undefined;
  toggleDelete: (succes: boolean, text: string) => void;
  userId?: string
};
const ModalWindowComponent: FC<ModalWindowComponentProp> = ({
  fileName,
  token,
  id,
  toggleDelete,
  userId
}) => {
  
  const router = useRouter();

  const startDeletePhoto = async () => {
   const res = await deletePhoto(token, id, fileName);
   if(res.message === true) {
    console.log('ok');
    router.push(`/account/${userId}`);
   } else {
    toggleDelete(true, 'ошибка удаления');
   }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-4 w-36">Удалить фото</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Удаленные фотографии невозможно восстановить. Только загрузить
            заново.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={startDeletePhoto}>Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalWindowComponent;
