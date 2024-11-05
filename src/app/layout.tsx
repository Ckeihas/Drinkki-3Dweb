import dynamic from "next/dynamic";
import "./globals.css";
import { roboto } from "@/fonts/Fonts";
import ViewCanvas from "@/components/ViewCanvas";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable} style={{backgroundColor: '#FDE047'}}>
        <main>
        {children}
        <ViewCanvas />
        </main>
      </body>
    </html>
  );
}
