'use client'
import { userStore } from "@/store/user";
import { useRouter, usePathname} from "next/navigation"
import { useEffect, Suspense, useMemo } from "react";
import Cookies from 'js-cookie';

export default function ProtectedProvider({
    children,
  }: {
    children: React.ReactNode
}) {
    let permit = useMemo(() =>[ '/auth/login', '/auth/register', '/auth/verify'], [] );
    const user = userStore(state => state.user)
	let token = Cookies.get('token');
    console.log('Token: ' + token)

    const pathname = usePathname();
    const router = useRouter();

    console.log('Primero: ' + pathname)
    useEffect(() => {
        console.log(user)
        if( !permit.includes(pathname) ){
            if( user === null || (!token) ){
                router.push('/auth/login')
            }
        }
    }, [user, router, pathname, permit, token])

    return (<Suspense fallback={null}> { user === null ?
                                            permit.includes( pathname ) ? 
                                                children : <>Loading ...</> 
                                                    :  children } </Suspense>)
}