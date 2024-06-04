"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUser } from "@/requestserver/updateUser";

type ModalWindowForUpdateUserAccountProp = {
  user: {
    _id: string;
    avatarUrl: string;
    fullName: string;
    email: string;
  };
  pathImg: string;
  token?: string;
  toggleCheckUpdate: () => void
};

const typeImg = ["image/jpg", "image/png", "image/jpeg", "image/webp"];

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "имя слишком короткое, минимум 2 символа",
    })
    .max(50, {
      message: "имя слишком длинное, максимум 50 симолов",
    }),
  email: z.string().email({
    message: "не валидный email",
  }),
  avatarUrl: z.any(),
});

const ModalWindowForUpdateUserAccount: FC<
  ModalWindowForUpdateUserAccountProp
> = ({ user, pathImg, token, toggleCheckUpdate }) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [preView, setPreView] = useState("");
  const [checkUploadBtn, setCheckUploadBtn] = useState(false);
  const [chekUploadFile, setChekUploadFile] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedFile != null) {
      let uploadFile = [];
      uploadFile = typeImg.filter((elem) => elem === selectedFile.type);
      if (uploadFile.length === 0) {
        setChekUploadFile(true);
        return;
      }
    }
    setCheckUploadBtn(true);
    let dataUser = {
      id: user._id,
      fullName: values.fullName,
      email: values.email,
      avatarUrl: selectedFile ? selectedFile.name : user.avatarUrl,
    };
    if (token) {
      const sendUpdateUser = async () => {
        const data = await updateUser(
          dataUser,
          selectedFile ? selectedFile : null,
          token
        );
        console.log(data);
      if (data?.success === true) {
          console.log(data);
          setUpdateMessage("Обновление прошло успешно");
          setCheckUploadBtn(false);
          toggleCheckUpdate();
          return;
        }
        if (data?.success === false) {
          setUpdateMessage("Обновление не удалось");
          setCheckUploadBtn(false);
          return;
        } 
      };
      sendUpdateUser();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setSelectedFile(e.target.files[0]);
      setPreView(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-1 w-32  sm:w-4/5">редактировать</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {updateMessage === "" ? "Обновить профиль" : updateMessage}
          </DialogTitle>
          <DialogDescription>
            {chekUploadFile === false
              ? "Здесь вы можете обновить информацию о себе"
              : "не валидный формат"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <Avatar>
            <AvatarImage src={`${pathImg}/${user._id}/${user.avatarUrl}`} />
            <AvatarFallback>нк</AvatarFallback>
          </Avatar>
          {selectedFile && (
            <Avatar>
              <AvatarImage src={preView} />
            </Avatar>
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>имя</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>файл</FormLabel>
                  <FormControl>
                    <Input {...field} type={"file"} onChange={handleChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {checkUploadBtn === false ? (
              <Button type="submit" className="bg-green-600">
                обновить
              </Button>
            ) : (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                загрузка...
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindowForUpdateUserAccount;
