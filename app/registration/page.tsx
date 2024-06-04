"use client";

import { useState } from "react";
import styles from "./../ui/Registration.module.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { dataUserFunc } from "@/requestserver/sendregistration";
import { useRouter } from "next/navigation";
import { setCookiesApp } from "@/helpers/cookiesToken";

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
  password: z
    .string()
    .min(8, {
      message: "пароль должен содержать 8 символов",
    })
    .max(8, {
      message: "пароль должен содержать 8 символов",
    }),
  avatarUrl: z.any(),
});

const Registration = () => {

  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [preView, setPreView] = useState("");
  const [chekUploadFile, setChekUploadFile] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [responseServer, setResponseServer] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
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
    let dataUser = {
      fullName: values.fullName,
      email: values.email,
      avatarUrl: selectedFile ? selectedFile.name : "photouserdefault.png",
      password: values.password,
    };
    dataUserFunc(dataUser, selectedFile)
      .then((data: any) => data.text())
      .then((data2) => {
        if (data2 === "ошибка сервера") {
          setResponseServer(data2);
          setDisabledBtn(false);
          return;
        } else {
          setCookiesApp("token", data2.token);
          router.push("/login");
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
    <div className={styles.container}>
      {responseServer && (
        <Alert>
          <AlertTitle>{responseServer}</AlertTitle>
          <AlertDescription>
            попробуйте загрузить данные еще раз
          </AlertDescription>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>пароль</FormLabel>
                <FormControl>
                  <Input  {...field} type={"password"}/>
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
          {disabledBtn ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              пожалуйста подождите
            </Button>
          ) : (
            <Button type="submit" className="bg-green-600">
              регистрация
            </Button>
          )}
        </form>
      </Form>
      {selectedFile && (
        <Image
          src={preView}
          alt="аватар"
          width={200}
          height={200}
          className="mt-1 mb-1"
        />
      )}
    </div>
  );
};

export default Registration;
