import { inter, moranga } from "_assets/fonts";
import { ThemeProvider } from "_components/ThemeProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import "_styles/gridlayout.css";
import "_styles/globals.scss";
import cn from "classnames";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JCX Portfolio",
  description:
    "Hola, soy Juan Camilo Méndez, un desarrollador creativo de Colombia.",
  authors: [{ name: "Juan Camilo Méndez", url: "https://web-jcx.vercel.app/" }],

  openGraph: {
    title: "JCX Portfolio",
    description:
      "Hola, soy Juan Camilo Méndez, un desarrollador creativo de Colombia.",
    url: "https://web-jcx.vercel.app/",
    siteName: "JCX Méndez — Creative Developer",
    images: [
      {
        url: "https://web-jcx.vercel.app/sticker.png",
        width: 1920,
        height: 1080,
      },
    ],
    type: "website",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, moranga.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          {/* <Analytics /> */}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
