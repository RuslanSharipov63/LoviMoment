"use client"
import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type InputForMobileWinbdowForSearchProp = {
  handleHidden: () => void;
}

const FormSchema = z.object({
  tags: z.string().min(2, {
    message: "Введите больше двух символов",
  }),
})

 const InputForMobileWinbdowForSearch:FC<InputForMobileWinbdowForSearchProp>  = ({handleHidden}) => {

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tags: "",
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
   
    const searchtags = values.tags
    router.push(`/search/${searchtags}`);
    handleHidden(); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Теги</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
               введите не менее 2 символов
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Найти</Button>
      </form>
    </Form>
  )
}

export default InputForMobileWinbdowForSearch;