"use client";
import { updateTags } from "@/requestserver/updateTags";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";


type ModalWindowForUpdateTagsComponentProp = {
  tags?: string;
  id?: string;
  token: string;
  toggleCheckUpdatePhoto: () => void
};

const FormSchema = z.object({
  tags: z.string().min(2, {
    message: "тег минимум из двух символов",
  }),
});

const ModalWindowForUpdateTagsComponent: FC<
  ModalWindowForUpdateTagsComponentProp
> = ({ tags, id, token, toggleCheckUpdatePhoto }) => {
  const [statusUpdateTags, setStatusUpdateTags] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tags: tags,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const dataForUpdatePhoto = {
      id,
      token,
      tags: data.tags,
    };
    const sendUpdateTags = async () => {
      const data = await updateTags(dataForUpdatePhoto);
      if (data.success === true) {
        setStatusUpdateTags("теги обновлены");
        toggleCheckUpdatePhoto();
        return;
      }
      if (data.success === false) {
        setStatusUpdateTags("ошибка. попробуйте еще раз");
        return;
      }
    };
    sendUpdateTags();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-36">Обновить теги</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>редактировать теги</DialogTitle>
          {statusUpdateTags && (
            <DialogDescription>{statusUpdateTags}</DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="sm:max-w-[425px]"
              >
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тэги</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-2">
                  обновить
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindowForUpdateTagsComponent;
