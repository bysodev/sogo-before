'use client'
import { zustandStore } from "@/store/user";
import { useRouter, usePathname} from "next/navigation"
import { useEffect, Suspense, useMemo } from "react";
import Cookies from 'js-cookie';
import { useStore } from "@/hooks/useStore";
// import { myAction } from "./validate-token";

export default function ProtectedProvider({
    children,
  }: {
    children: React.ReactNode
}) {
    let permit = useMemo(() =>[ '/auth/login', '/auth/register', '/auth/verify'], [] );
    const user = useStore(zustandStore, state => state.user)
    console.log(`Veamos al usuario: ${ JSON.stringify( user ) }`)
	let token = Cookies.get('token');
    console.log('Token: ' + token)

    const pathname = usePathname();
    const router = useRouter();

    console.log('Primero: ' + pathname)
    useEffect(() => {
        // const respues = myAction().then( res => res?.verified) // Posible solución para no usar middleware, pero sale un error, ya que server es solo experimental al parecer o problemas de renderizado
        // console.log(respues)
        console.log(user)
        if( !permit.includes(pathname) ){
            if( user === null || (!token) ){
                router.push('/auth/login')
            }
        }
    }, [user, router, pathname, permit, token])

    return (<Suspense> { user === null ?
                            permit.includes( pathname ) ? 
                                children : <>Loading ...</> 
                                    :  children } </Suspense>)
                                    
}