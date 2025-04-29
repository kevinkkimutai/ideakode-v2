import { ReduxProvider } from "./provider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
  
        <ReduxProvider>
       {children}
        </ReduxProvider>
       
      </body>
    </html>
  );
}
