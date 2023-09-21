// import {jwtVerify} from 'jose'
import Cookies from 'js-cookie'
import { userStore } from "@/store/user";

import {useMemo} from 'react'
import { usePathname } from 'next/navigation';


export const useAuthenticated = (): boolean =>{

    const user = userStore(state => state.user)
    const pathname = usePathname();

    const isAuthenticated = useMemo(() => user !== null, [user]);

    return isAuthenticated;

    // const key = new TextEncoder().encode( process.env.SECRET_KEY )
    // const jwtString = JSON.stringify(token);
    // const dato= await jwtVerify(token+'', key);
    // // jwtVerify(jwtString, key).then(result => console.log(result)).catch(ex=>console.log(ex)) ;
    // console.log(dato)

    // if( dato.payload.exp ){
    //   console.log(new Date())
    //   console.log( new Date( dato.payload.exp * 1000 )) // formato: 2023-07-24T15:45:48.000Z
    //   if( new Date() >   new Date( dato.payload.exp * 1000 )){
    //     console.log('SALTE')
    //     return false;
    //   }else{
    //     console.log('ENTRASTE')
    //     return true;

    //   }
    // //   console.log( new Date( dato.payload.exp * 1000 )) // formato: 2023-07-24T15:45:48.000Z
    // }

}