import { Outfit } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ReduxProvider from "@/components/services/ReduxProvider";
import ClientProvider from "@/components/services/ClientProvider";
import LanguageSwitcher from "@/components/global/LanguageSwitcher";
import { TranslationProvider } from "@/hooks/useTranslation";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gradient-to-r from-[#0F2740] via-[#093355] to-[#035A91]`}>
      <TranslationProvider>
      <ReduxProvider>
        <ClientProvider>
        <ThemeProvider>
          <SidebarProvider>

          
            {children}
          
          {/* <LanguageSwitcher /> */}
          </SidebarProvider>
        </ThemeProvider>
        </ClientProvider>
   
        </ReduxProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
