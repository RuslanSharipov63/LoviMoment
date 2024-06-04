"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { getCookiesToken } from "@/helpers/cookiesToken";
import { deleteCookiesToken } from "@/helpers/cookiesToken";
import { UserType } from "@/typesApp";
import { getUserByToken } from "@/requestserver/getUserByToken";
import { Input } from "@/components/ui/input";
import MobileWindowForSearch from "./MobileWindowForSearch";

const MobileMenu = () => {
  const [isToken, setIsToken] = useState<string | undefined>();
  const [oneUser, setOneUser] = useState<UserType>();
  const [searchtags, setSearchTags] = useState<string | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    const getToken = async () => {
      const token = await getCookiesToken("token");
      setIsToken(token?.value);
      return;
    };
    getToken();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const response = await getUserByToken(isToken);
      const user = await response;
      setOneUser(user);
    };
    if (isToken) {
      getUser();
    }
  }, [isToken]);

  useEffect(() => {
    if (pathname.includes("login")) {
      const getToken = async () => {
        await deleteCookiesToken();
        const token = await getCookiesToken("token");
        setIsToken(token?.value);
        return;
      };

      getToken();
      return;
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname.includes("account")) {
      const getToken = async () => {
        const token = await getCookiesToken("token");
        setIsToken(token?.value);
        return;
      };
      getToken();
    }
  }, [pathname]);


  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTags(e.target.value)

  }

  return (
    <div className="sm:hidden flex justify-between w-full p-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>меню</MenubarTrigger>
          <MenubarContent className="sm:hidden">
            <MenubarItem>
              <Link href="/"> Главная</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/about">о прокте</Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Link href="/contacts">Контакты</Link>
            </MenubarItem>
            <MenubarSeparator />

            {isToken ? <MenubarItem>
              <Link href={`/account/${oneUser?._id}`}>профиль</Link>
            </MenubarItem>

              : <MenubarItem>
                <Link href="/login">профиль</Link>
              </MenubarItem>

            }
            <MenubarSeparator />
            <MenubarItem>
              <Link href="/login">{isToken ? "Выйти" : "Войти"}</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/registration">регистрация</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
          <MobileWindowForSearch />
    </div>
  );
};

export default MobileMenu;
