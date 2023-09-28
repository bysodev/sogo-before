'use client'
import { useForm } from '@/hooks/useForm'
import { zustandStore } from '@/store/user';
import { validateOfRegister } from '@/validators/auth-validators';
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {


	const fetchRegisterUser  = zustandStore( state => state.fetchRegisterUser )

  const { username, email, password, confirmPassword, handleChange, resetForms } = useForm( { username: '', email: '', password: '', confirmPassword: '' } )

  function onSubmit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault(); 
	let confirm = validateOfRegister( {username, email, password, confirmPassword} ) 
	if( confirm ){
		console.log(username, email, password, confirmPassword);  
		fetchRegisterUser( username, password, email ) 
	} 
  } 


  return (
    <div className='container h-screen mx-auto'>
			<div className='flex h-full items-center justify-center px-6'>
				<div className='w-full xl:w-3/4 lg:w-11/12 flex shadow'>
					<div
						className='w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg'
						style={{
							backgroundImage: `url('https://vidcache.net:8161/static/b5a0760b31fddf19325cc67eb4bbf19ce8271a18/login-register.jpg')`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
						}}
					></div>
					<div className='w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none'>
						<h3 className='pt-4 text-step-2 font-bold text-center capitalize'>
							Crea una cuenta!
						</h3>
						<form className='px-8 pt-6 pb-8 mb-4 bg-white rounded' onSubmit={onSubmit}>
							<div>
								<div className='mb-4 md:mr-2 md:mb-0'>
									<label
										className='block mb-2 text-sm font-bold text-gray-700'
										htmlFor='username'
									>
										Nombre de usuario
									</label>
									<input
										className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:shadow-outline'
										id='username'
										type='text'
										placeholder='Juandeveloper'
										name='username'
										value={username}
										required
										minLength={3}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className='mb-2'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='email'
								>
									Correo electrónico
								</label>
								<input
									className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:shadow-outline'
									id='email'
									type='email'
									placeholder='juandev@gmail.com'
									name='email'
									value={email}
									required
									onChange={handleChange}
								/>
							</div>
							<div className='md:flex md:justify-between'>
								<div className='mb-4 md:mr-2 md:mb-0'>
									<label
										className='block mb-2 text-sm font-bold text-gray-700'
										htmlFor='password'
									>
										Constraseña
									</label>
									<input
										className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow-sm appearance-none focus:shadow-outline'
										id='password'
										type='password'
										placeholder='******************'
										name='password'
										value={password}
										required
										minLength={6}
										onChange={handleChange}
									/>
								</div>
								<div className='md:ml-2'>
									<label
										className='block mb-2 text-sm font-bold text-gray-700'
										htmlFor='confirmPassword'
									>
										Confirmar contraseña
									</label>
									<input
										className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:shadow-outline'
										id='confirmPassword'
										type='password'
										placeholder='******************'
										name='confirmPassword'
										value={confirmPassword}
										required
										minLength={6}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className='mb-6 text-center'>
								<button
									className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:shadow-outline'
									type='submit'
								>
									Registrar cuenta
								</button>
							</div>
							<hr className='mb-6 border-t' />
							
							<div className='text-center'>
								<Link
									href='/auth/login'
									className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
								>
									¿Ya tienes una cuenta? Inicia sesión!
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
  )
}
