'use client'

import { useForm } from '@/hooks/useForm'
import { userStore } from '@/store/user';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  const router = useRouter();
  const [fetchLoginUser, user] = userStore( state => [state.fetchLoginUser, state.user] );
  const {username, password, handleChange, resetForms} = useForm( {username: '', password: ''} );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, password);
	const response = await fetchLoginUser(username, password);
	if( response )
		resetForms();
		router.push('/')

  }

  return (
    <div className='container h-screen mx-auto'>
			<div className='flex h-full items-center justify-center px-6'>
				<div className='w-full xl:w-3/4 lg:w-11/12 flex shadow'>
					<div
						className='w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'
						style={{
							backgroundImage: `url('https://vidcache.net:8161/static/b5a0760b31fddf19325cc67eb4bbf19ce8271a18/login-register.jpg')`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
						}}
					>
          </div>
					<div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
						<h3 className='pt-4 text-center capitalize text-step-2 font-bold'>
							Bienvenido!!
						</h3>
						<form className='px-8 pt-6 pb-8 mb-4 bg-white rounded' onSubmit={onSubmit}>
							<div className='mb-4'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='username'
								>
									Usuario
								</label>
								<input
									className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:shadow-outline'
									id='username'
									required
									type='text'
									maxLength={12}
									placeholder='Bryan Solórzano'
									onChange={handleChange}
									name='username'
									value={username}
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='password'
								>
									Contraseña
								</label>
								<input
									required
									className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow-sm appearance-none focus:shadow-outline'
									id='password'
									type='password'
									placeholder='******************'
									minLength={6}
									onChange={handleChange}
									name='password'
									value={password}
								/>
							</div>
							<div className='mb-6 text-center'>
								<button
									className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:shadow-outline'
									type='submit'
								>
									Iniciar Sesión
								</button>
							</div>
							<hr className='mb-6 border-t' />
							<div className='text-center'>
								<Link
									href={'/auth/register'}
									className='inline-block text-sm text-blue-500 align-baseline
										hover:text-blue-800'
								>
									¿No tienes una cuenta? Registrate
								</Link>
							</div>
						
						</form>
					</div>
				</div>
			</div>
		</div>
  )
}
