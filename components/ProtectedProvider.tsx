"use client";

import { zustandStore } from "@/store/user";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { useStore } from "@/hooks/useStore";
// import { myAction } from "./validate-token";
import Loading from "../components/Loader";
export default function ProtectedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let permits = useMemo(
    () => ["/auth/login", "/auth/register", "/auth/verify", "/"],
    []
  );
  const user = useStore(zustandStore, (state) => state.user);
  const [permit, setPermit] = useState(false);
  const [token, setToken] = useState(Cookies.get("token"));

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // console.log( 'Este va siendo el usuario: ' + JSON.stringify( user ) )
    // console.log( 'Este va siendo el token: ' + token )
    // setPermit(true);
    if (token != undefined) {
      console.log("Se realiza la verificación");
      // myAction().then((value) =>
      //   value ? setPermit(true) : setToken(undefined)
      setPermit(true);
      //); // Posible solución para no usar middleware, pero sale un error, ya que server es solo experimental al parecer o problemas de renderizado
    }
    if (!permits.includes(pathname)) {
      // console.log('No permitido sin loguear')
      if (user === null || !token) {
        // console.log('Se hace el ruteo')
        router.push("/auth/login");
      }
    } else {
      setPermit(true);
    }
  }, [user, router, pathname, token, permits]);

  if (!permit)
    return (
      <>
        <Loading />
      </>
    );

  return <>{children}</>;
}
