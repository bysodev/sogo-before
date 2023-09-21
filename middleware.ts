import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest){
    const token = request.cookies.get('token');

    if( token ){
        const key = new TextEncoder().encode( process.env.SECRET_KEY )
        const jwtString = JSON.stringify(token);
        const value = token.value;
        const dato= await jwtVerify(value, key);

        if( dato.payload.exp ){
            console.log(new Date())
            console.log( new Date( dato.payload.exp * 1000 )) // formato: 2023-07-24T15:45:48.000Z
            if( new Date() >   new Date( dato.payload.exp * 1000 )){
                request.cookies.delete('token');
                return NextResponse.redirect(new URL("/auth/login", request.url));    
            }
            console.log( new Date( dato.payload.exp * 1000 )) // formato: 2023-07-24T15:45:48.000Z
          }
    }
    return NextResponse.next();
}