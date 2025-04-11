import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { isAuthenticated } from "@/actions/auth.action";
import { redirect } from "next/navigation";


const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Prepwise",
  description: "An AI powered mock interview platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticated= await isAuthenticated();
 
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className}  antialiased pattern`}
      >
        {children}
        <Toaster></Toaster>
      </body>
    </html>
  );
}
