"use client";
import { useState, FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./../app/ui/Registration.module.css";
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
import { sendLogin } from "@/requestserver/sendlogin";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Неверный email или пароль",
  }),
  password: z
    .string()
    .min(8, {
      message: "Неверный email или пароль",
    })
    .max(8, {
      message: "Неверный email или пароль",
    }),
});

type LoginComponentProp = {
  getToken: (token: string) => void;
}

const LoginComponent: FC<LoginComponentProp> = ({
  getToken
}) => {
  const [responseServer, setResponseServer] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "введите email",
      password: "введите пароль",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let loginData = {
      email: values.email,
      password: values.password,
    };
    sendLogin(loginData)
      .then((data: any) => data)
      .then((data2) => {
        if (data2.message) {
          setResponseServer(data2.message);
          return;
        } else {
          getToken(data2.token);
          router.push(`/account/${data2._id}`);
        }
      });
  }

  return (
    <div className={styles.container}>
      {responseServer && (
        <Alert>
          <AlertTitle>{responseServer}</AlertTitle>
          <AlertDescription>попробуйте войти снова</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input type={"password"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-green-600">
            войти
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginComponent;
