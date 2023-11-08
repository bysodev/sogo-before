import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { typeUser } from "@/utilities/types/user";
import { Category, category, typeLearn } from "@/utilities/types/learn";
// import Cookies from "js-cookie";
import { showErrorMessage, showSuccessMessage } from "@/utilities/sweet-alert";
// import { sendEmail } from "@/helpers/nodemailer";

const url = process.env.NEXT_PUBLIC_API_BACKEND + "";
const url_app = "http://localhost:3000";

interface State {
  user: typeUser | null;
  learn: typeLearn;
  token: string;
  validate: string;
  fetchLoginUser: (username: string, password: string) => Promise<boolean>;
  fetchRegisterUser: (
    name: string,
    password: string,
    email: string
  ) => Promise<boolean>;
  fetchVerifyUser: (token: string) => void;
}
// persist(
export const zustandStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      learn: {
        asiertos: 0,
        cantidad: 0,
        continue: false,
        porcentaje: 0,
        categoria: Category.null,
      },
      token: "",
      validate: "",

      fetchLoginUser: async (username: string, password: string) => {
        var myHeader = new Headers();
        myHeader.append("Accept", "application/json");
        myHeader.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        try {
          const response = await fetch(`${url}/user/login`, {
            method: "POST",
            body: urlencoded,
            headers: myHeader,
            credentials: "include",
            // credentials: 'same-origin',
            redirect: "follow",
          });
          if (response.status === 200) {
            const { access_token, message, username, email } =
              await response.json();
            showSuccessMessage(message);
            // Cookies.set("token", access_token);
            set(() => ({ user: { username, email, token: access_token } }));
            return true;
          } else {
            const respu = await response.json();
            showErrorMessage(respu.detail);
            return false;
          }
        } catch (error) {
          showErrorMessage("Problemas con la aplicación");
          console.error(error);
          return false;
        }
      },
      fetchRegisterUser: async (
        username: string,
        password: string,
        email: string
      ): Promise<boolean> => {
        var myHeader = new Headers();
        myHeader.append("Accept", "application/json");
        myHeader.append("Content-Type", "application/json");

        try {
          const response = await fetch(`${url}/user/register`, {
            method: "POST",
            body: JSON.stringify({
              username: username,
              password: password,
              email: email,
            }),
            headers: myHeader,
            redirect: "follow",
          });
          if (response.status === 201) {
            const respuesta = await response.json();
            showSuccessMessage("Usuario registrado correctamente");

            try {
              const response = await fetch(`${url_app}/api/emails/`, {
                method: "POST",
                body: JSON.stringify({
                  username,
                  email,
                  token: respuesta.token,
                }),
                headers: myHeader,
                redirect: "follow",
              });
              if (response.ok) {
                showSuccessMessage("Revise su correo para confirmar su cuenta");
                return true; // Indicar que la operación fue exitosa
              }
            } catch (e) {
              showErrorMessage(
                "El correo de verificación no pudo ser enviado. Intente de nuevo más tarde"
              );
            }
          } else {
            const respu = await response.json();
            showErrorMessage(respu.detail);
          }
        } catch (error) {
          showErrorMessage("Error en el servidor. Intente de nuevo más tarde");
        }
        return false; // Indicar que la operación falló
      },
      fetchVerifyUser(token: string) {},
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
