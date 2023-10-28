'use server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

export async function myAction() {
    if( cookies().has('token') ){
        const token = cookies().get('token');
        if( token ){
            const key = new TextEncoder().encode( process.env.SECRET_KEY )
            const jwtString = JSON.stringify(token);
            const value = token.value;
            try{
                const dato = await jwtVerify(value, key);
                return true;
                // return { verified: true, message: 'ok'}
            } catch(e){
                cookies().delete('token');
                return false;
                // return { verified: false, message: 'no'}
            }
        }
    }
}