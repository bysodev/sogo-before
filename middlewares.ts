import { NextResponse } from 'next/server';
import  type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'
import Cookies from 'js-cookie';

export async function middleware(request: NextRequest){
    // const token = request.cookies.get('token');
    // console.log(`Este es el token: ${token?.value  }`);
    try{
        console.log('Se ejecuto')
        request.cookies.delete('token')
    }catch(e){
        console.log('Este es el error')
        console.log(e);
    }
    // Cookies.remove('token')
    // if( token ){
    //     const key = new TextEncoder().encode( process.env.SECRET_KEY )
    //     const jwtString = JSON.stringify(token);
    //     const value = token.value;
    //     try{
    //         const dato = await jwtVerify(value, key);
    //         if( dato.payload.exp ){
    //             if( new Date() >   new Date( dato.payload.exp * 1000 )){
    //                 request.cookies.delete('token');
    //             }
    //         }else{
    //             request.cookies.delete('token');
    //         }
    //     } catch(e){
    //         request.cookies.delete('token');
    //     }
    // }
    // Cookies.remove('token')
    // request.cookies.delete('token');
    // return NextResponse.next();
}