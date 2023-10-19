import "./globals.css";
import Favicon from "/public/next.svg";
import type { Metadata } from "next";
import ProtectedProvider from "@/components/ProtectedProvider";
export const metadata: Metadata = {
  title: "Sogo Sign",
  description: "Plataforma de aprendizaje de Lengua de Señas Ecuatoriana",
  icons: [{ rel: "icon", url: Favicon.src }],
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProtectedProvider>
          {children}
        </ProtectedProvider>
      </body>
    </html>
  );
}
