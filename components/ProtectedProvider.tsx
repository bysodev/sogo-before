'use client'
import { zustandStore } from "@/store/user";
import { useRouter, usePathname} from "next/navigation"
import { useEffect, Suspense, useMemo, useState } from "react";
import Cookies from 'js-cookie';
import { useStore } from "@/hooks/useStore";
import { myAction } from "./validate-token";

export default function ProtectedProvider({
    children,
  }: {
    children: React.ReactNode
}) {
    let permits = useMemo(() =>[ '/auth/login', '/auth/register', '/auth/verify'], [] );
    const user = useStore(zustandStore, state => state.user)
	let token = Cookies.get('token');
    const [permit, setPermit] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        console.log( 'Este va siendo el usuario: ' + JSON.stringify( user ) )
        console.log( 'Este va siendo el token: ' + token )
        myAction().then( () => setPermit(true) ) // Posible solución para no usar middleware, pero sale un error, ya que server es solo experimental al parecer o problemas de renderizado
        if( !permits.includes(pathname) ){
            if( user === null || (!token) ){
                router.push('/auth/login')
            }
        }
        
    }, [user, router, pathname, token, permits])
    console.log(pathname)
    console.log(permits.includes(pathname))

    if( !permit )
        return (<>Loading ...</>)

    if( user !== null && !!token )
        return ( <Suspense>{children}</Suspense>);
    else if( permits.includes(pathname) )  
        return ( <Suspense>{children}</Suspense>);
    else   
        return ( <Suspense><></></Suspense>);

        

    // return ( <Suspense> { ( (user !== null) && !token )  ? children : ( (permits.includes(pathname)) ? children : <></> )} </Suspense>)
}