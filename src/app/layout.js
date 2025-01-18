
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/Components/Menu/NavBar";
import SupportSection from "@/Components/Home/SupportSection";
import FirebaseProvider from "@/Firebase/FirebaseContext"
import { Toaster } from "react-hot-toast";


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

export const metadata = {
  icons : {
    icon : "/logo.png"
  },
  description : "Rent cars and learn driving from skilled drivers in jauharabad and khushab.we also provide services like carwash in jauharabad and khushab"
};

export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>      
          <FirebaseProvider>
          <NavBar />
          
          <div>{children}
          <Toaster />
          </div>
          <SupportSection />
          </FirebaseProvider>
        </div>
      </body>
    </html>
  );
}
