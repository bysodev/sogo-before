"use client";
import { useForm } from "react-hook-form";
import { zustandStore } from "@/store/user";
import { useStore } from "@/hooks/useStore";

import Image from "next/image";
import Link from "next/link";
import TooltipMessage from "../../../components/TooltipMessage";

export default function Home() {
  const fetchRegisterUser = zustandStore((state) => state.fetchRegisterUser);

  interface UseFormInputs {
    username: string;
    email: string;
    password: string;
    repass: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UseFormInputs>();

  function onSubmit(data: UseFormInputs) {
    if (data) fetchRegisterUser(data.username, data.password, data.email);
    // if (response) {
    // reset();
    //   router.push("/");
  }

  return (
    <div className="h-screen w-full">
      <div className="grid place-items-center h-full w-full m-auto">
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-1 sm:p-5 rounded-lg lg:rounded-l-none">
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
              Crea una cuenta
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
                    placeholder="Nombre de usuario"
                    {...register("username", {
                      required: { value: true, message: "Usuario requerido" },
                      minLength: {
                        value: 3,
                        message: "Requiere al menos 3 caracteres",
                      },
                    })}
                  />
                  {errors.username && (
                    <TooltipMessage message={errors.username.message!} />
                  )}
                </div>

                <div
                  className={`flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${
                    errors.email
                      ? "text-red-600 border-red-400"
                      : "text-gray-600 border-gray-400"
                  } container-fluid`}
                >
                  <input
                    className="w-11/12 focus:outline-none"
                    type="email"
                    placeholder="Correo electrónico"
                    {...register("email", {
                      required: { value: true, message: "Correo requerido" },
                    })}
                  />
                  {errors.email && (
                    <TooltipMessage message={errors.email.message!} />
                  )}
                </div>

                <div className="md:grid md:grid-flow-row md:grid-cols-2 md:gap-4">
                  <div
                    className={`flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${
                      errors.password
                        ? "text-red-600 border-red-400"
                        : "text-gray-600 border-gray-400"
                    } container-fluid`}
                  >
                    <input
                      className="w-10/12 focus:outline-none"
                      type="password"
                      placeholder="Contraseña"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Contraseña requerido",
                        },
                        minLength: {
                          value: 6,
                          message: "Requiere al menos 6 caracteres",
                        },
                      })}
                    />
                    {errors.password && (
                      <TooltipMessage message={errors.password.message!} />
                    )}
                  </div>
                  <div
                    className={`flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${
                      errors.repass
                        ? "text-red-600 border-red-400"
                        : "text-gray-600 border-gray-400"
                    } container-fluid`}
                  >
                    <input
                      className="w-10/12 focus:outline-none"
                      type="password"
                      placeholder="Confirmar"
                      {...register("repass", {
                        required: {
                          value: true,
                          message: "Confirmar contraseña requerido",
                        },
                        minLength: {
                          value: 6,
                          message: "Requiere al menos 6 caracteres",
                        },
                      })}
                    />
                    {errors.repass && (
                      <TooltipMessage message={errors.repass.message!} />
                    )}
                  </div>
                </div>
              </div>
              <button
                className="mt-4 py-3 px-4 w-full font-bold text-white bg-gray-900 rounded-full hover:bg-gray-950 "
                type="submit"
              >
                Registrar cuenta
              </button>
              <div className="flex flex-row items-center gap-4 my-8">
                <div className="h-0.5 w-full bg-gray-300"></div>
              </div>
              <div className="text-center mt-4 text-sm font-semibold text-gray-400 align-baseline">
                <p>¿Ya tienes una cuenta?</p>
                <Link
                  href={"/auth/login"}
                  className="font-bold text-gray-500 hover:text-gray-700"
                >
                  Inicia sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
