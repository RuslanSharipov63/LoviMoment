"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState, FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { dataUploadPhoto } from "@/requestserver/dataUploadPhoto";

const formSchema = z.object({
  tags: z.string().min(2, {
    message: "тег минимум из двух символов",
  }),
  photo: z.any(),
});

const typeImg = ["image/jpg", "image/png", "image/jpeg", "image/webp"];

type AddPhotoProps = {
  textbtn: string;
  token?: string;
  checkAddPhoto: () => void;
};

const AddPhoto: FC<AddPhotoProps> = ({ textbtn, token, checkAddPhoto }) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [preView, setPreView] = useState("");
  const [chekUploadFile, setChekUploadFile] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [responseServer, setResponseServer] = useState("");
  const pathUrl = usePathname();

  let userId = pathUrl.split("/")[2];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: "",
      photo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setDisabledBtn(true);
    if (selectedFile != null) {
      let uploadFile = [];
      uploadFile = typeImg.filter((elem) => elem === selectedFile.type);
      if (uploadFile.length === 0) {
        setChekUploadFile(true);
        return;
      }
    }
    setPreView("");
    let infoAboutPhoto = {
      imageURL: selectedFile.name,
      tags: values.tags,
      size: selectedFile.size,
      user: userId,
    };

    dataUploadPhoto(infoAboutPhoto, selectedFile, token)
      .then((data: any) => data.json())
      .then((data2) => {
        if (data2.message != "файл сохранен") {
          setResponseServer("ошибка сервера");
          setDisabledBtn(false);
          return;
        } else {
          setResponseServer("файл успешно сохранен");
          setDisabledBtn(false);
          setSelectedFile(null);
          checkAddPhoto();
        }
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChekUploadFile(false);
    if (e.target.files != null) {
      setSelectedFile(e.target.files[0]);
      setPreView(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <Card className=" w-full m-2 p-4 sm:w-96">
        <CardTitle className="mb-4">Добавить фото</CardTitle>
        {responseServer && (
          <Alert>
            <AlertTitle>{responseServer}</AlertTitle>
          </Alert>
        )}
        {chekUploadFile && (
          <Alert>
            <AlertTitle>ошибка загрузки файла</AlertTitle>
            <AlertDescription>
              допустимые расширения файлов: jpeg, jpg, png, webp
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Теги</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photo"
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
            {disabledBtn ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                пожалуйста подождите
              </Button>
            ) : (
              <Button type="submit" className="bg-orange-500">
                {textbtn}
              </Button>
            )}
          </form>
        </Form>
      </Card>
      {selectedFile && (
        <div className="mt-2">
          <Image
            src={preView}
            alt="аватар"
            width={200}
            height={200}
            className="mt-1 mb-1 rounded-lg"
          />
        </div>
      )}
    </>
  );
};

export default AddPhoto;
