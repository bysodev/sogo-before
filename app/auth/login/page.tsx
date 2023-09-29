"use client";

import { useForm } from "react-hook-form";
import { userStore } from "@/store/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TooltipMessage from "../../../components/TooltipMessage";

export default function LoginPage() {
  const router = useRouter();
  const [fetchLoginUser, user] = userStore((state) => [
    state.fetchLoginUser,
    state.user,
  ]);

  interface UseFormInputs {
    username: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UseFormInputs>();

  async function onSubmit(data: UseFormInputs) {
    const response = await fetchLoginUser(data.username, data.password);
    if (response) {
      reset();
      router.push("/");
    }
  }

  return (
    <div className="h-screen w-full">
      <div className="grid place-items-center h-full w-full m-auto">
        <div className="w-full md:w-1/2 xl:w-1/3 bg-white p-1 sm:p-5 rounded-lg lg:rounded-l-none">
          <div className="p-8 py-2">
            <Image
              priority
              className="mx-auto mb-6"
              height={80}
              width={80}
              src="./../src/logo-min.svg"
              alt="Logo reducido de SoGo Sign"
            />
            <p className="mb-8 whitespace-normal text-3xl text-center font-bold text-gray-950">
              Bienvenido
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div
                  className={`flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${
                    errors.username
                      ? "text-red-600 border-red-400"
                      : "text-gray-600 border-gray-400"
                  } container-fluid`}
                >
                  <input
                    className="w-11/12 focus:outline-none"
                    type="text"
                    placeholder="Usuario o correo"
                    {...register("username", {
                      required: { value: true, message: "Usuario requerido" },
                    })}
                  />
                  {errors.username && (
                    <TooltipMessage message={errors.username.message!} />
                  )}
                </div>

                <div
                  className={`flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${
                    errors.password
                      ? "text-red-600 border-red-400"
                      : "text-gray-600 border-gray-400"
                  } container-fluid`}
                >
                  <input
                    className="w-11/12 focus:outline-none"
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Contraseña requerida",
                      },
                      minLength: {
                        value: 5,
                        message: "Requiere al menos 5 caracteres",
                      },
                    })}
                  />
                  {errors.password && (
                    <TooltipMessage message={errors.password.message!} />
                  )}
                </div>
              </div>
              <div className="p-2 text-end">
                <Link
                  href={"*"}
                  className="font-medium text-sm text-gray-500 align-baseline
										hover:text-gray-700"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <button
                className="mt-2 py-3 px-4 w-full font-bold text-white bg-gray-900 rounded-full hover:bg-gray-950 "
                type="submit"
              >
                Iniciar Sesión
              </button>
              <div className="flex flex-row items-center gap-4 my-4">
                <div className="h-0.5 w-full bg-gray-300"></div>
                <div className="text-gray-400 font-bold">O</div>
                <div className="h-0.5 w-full bg-gray-300"></div>
              </div>
              <div className="grid md:grid-flow-row md:grid-cols-2 gap-4">
                <button
                  className="inline-flex justify-center gap-4 py-3 px-4 w-full font-semibold text-gray-950 border border-gray-600 rounded-full hover:bg-gray-50"
                  type="submit"
                >
                  <Image
                    loading="lazy"
                    className="my-auto"
                    height={25}
                    width={25}
                    src="./../src/google-icon.svg"
                    alt="Logo de Google"
                  />
                  Google
                </button>
                <button
                  className="inline-flex justify-center gap-4 py-3 px-4 w-full font-semibold text-gray-950 border border-gray-600 rounded-full hover:bg-gray-50"
                  type="submit"
                >
                  <Image
                    loading="lazy"
                    className="my-auto"
                    height={25}
                    width={25}
                    src="./../src/facebook-icon.svg"
                    alt="Logo de Facebook"
                  />
                  Facebook
                </button>
              </div>
              <div className="text-center mt-8 text-sm font-semibold text-gray-400 align-baseline">
                <p>¿No tienes una cuenta?</p>
                <Link
                  href={"/auth/register"}
                  className="font-bold text-gray-500 hover:text-gray-700"
                >
                  Registrate
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
