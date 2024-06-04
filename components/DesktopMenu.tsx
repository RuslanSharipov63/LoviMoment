"use client";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getCookiesToken } from "@/helpers/cookiesToken";
import { deleteCookiesToken } from "@/helpers/cookiesToken";
import { getUserByToken } from "@/requestserver/getUserByToken";
import { UserType } from "@/typesApp";
import { Input } from "@/components/ui/input";

const DesktopMenu = () => {
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
    <div className="invisible sm:visible flex justify-center w-full p-1">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                ЛОВИ МОМЕНТ
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                О проекте
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contacts" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Контакты
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {isToken ? (
            <NavigationMenuItem>
              <Link href={`/account/${oneUser?._id}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Профиль
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Профиль
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          <NavigationMenuItem>
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {isToken ? "Выйти" : "Войти"}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/registration" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Регистрация
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Input type="text" className="w-32" value={searchtags} onChange={handleSearch}/>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`/search/${searchtags}`} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Поиск
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopMenu;
