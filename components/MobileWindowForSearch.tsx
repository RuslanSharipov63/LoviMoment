"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputForMobileWinbdowForSearch from "./InputForMobileWindowForSearch";

const MobileWindowForSearch = () => {

const [hidden, setHidden] = useState<boolean>(true);

const handleHidden = () => {
  console.log(hidden);
  setHidden(false);
  console.log(hidden);
}


  return (
      <Dialog>
        <DialogTrigger asChild className="ml-4">
          <Button>Поиск</Button>
        </DialogTrigger>
{hidden === false ? null :
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Поиск</DialogTitle>
            <DialogDescription>
              Поиск производится по тегам
            </DialogDescription>
          </DialogHeader>    
          <InputForMobileWinbdowForSearch handleHidden={handleHidden}/>
        </DialogContent>
}
      </Dialog> 
  );
};

export default MobileWindowForSearch;
