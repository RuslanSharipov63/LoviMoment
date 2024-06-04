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

type ModalWindowForDeleteAccountProp = {
  deleteAccount: () => void;
};

const ModalWindowForDeleteAccount: FC<ModalWindowForDeleteAccountProp> = ({
  deleteAccount,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-1 w-32 sm:w-4/5">удалить</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы действительно хотите удалить аккаунт?
          </AlertDialogTitle>
          <AlertDialogDescription>
            После удаления аккаунт невозможно будет восстановить!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>отмена</AlertDialogCancel>
          <AlertDialogAction onClick={deleteAccount}>удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalWindowForDeleteAccount;
