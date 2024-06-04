import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Nunito, Raleway } from "next/font/google";
const dancingScript = Nunito({ subsets: ["cyrillic"], weight: ['700'] });
const raleway = Raleway({ subsets: ['cyrillic'], weight: ['700'] });

const Contacts = () => {
  return (
    <div className="flex justify-center w-full h-auto mt-20">
      <Accordion
        type="single"
        collapsible
        className="w-full ml-6 mr-6 sm:w-64 sm:ml-0 sm:mr-0"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className={`${dancingScript.className}`}>электронная почта</AccordionTrigger>
          <AccordionContent>
            <Link className={`${raleway.className}`} href="mailto:sharipov.r@mail.ru">sharipov.r@mail.ru</Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className={`${dancingScript.className}`}>телеграмм</AccordionTrigger>
          <AccordionContent>
            <Link className={`${raleway.className}`} href="https://t.me/ @r9u9s9">tg: @r9u9s9</Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Contacts;
