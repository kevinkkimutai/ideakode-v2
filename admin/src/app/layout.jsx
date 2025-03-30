import { Outfit } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ReduxProvider from "@/components/services/ReduxProvider";
import ClientProvider from "@/components/services/ClientProvider";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
      <ReduxProvider>
        <ClientProvider>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
        </ClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
