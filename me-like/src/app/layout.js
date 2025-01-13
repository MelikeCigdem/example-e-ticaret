"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import { useDisclosure } from "@mantine/hooks";
import { SessionProvider, signOut } from "next-auth/react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { store } from "./store/store";
import { Provider } from "react-redux";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const RegisterModal = dynamic(
  () => import("@/components/MembershipCheckModal"),
  { ssr: false }
);

export default function RootLayout({ children }) {
  const [openSheet, setOpenSheet] = useState(false);
  const [cookieIsMobile, setCookieIsMobile] = useState(null); // Başlangıçta null

  const [
    registerModal,
    { open: registerModalOpen, close: registerModalClose },
  ] = useDisclosure(false);

  useEffect(() => {
    const mobileStatus = getCookie("deviceis");
    setCookieIsMobile(mobileStatus);
  }, []);

  const openAuth = () => {
    registerModalOpen();
  };

  const safeLogout = () => {
    signOut().then((res) => {});
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <SessionProvider>
            <Header openAuth={openAuth} safeLogout={safeLogout} />
            <RegisterModal
              opened={registerModal}
              onClose={registerModalClose}
            />

            {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
