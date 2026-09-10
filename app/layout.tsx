import "./globals.css";
import type {Metadata,Viewport} from "next";

export const metadata:Metadata={
  title:"NIGHTTOONS INDIA",
  description:"Hindi dubbed anime catalog",
  icons:{
    icon:[
      {url:"/icon.svg",type:"image/svg+xml"},
      {url:"/icon-192.png",sizes:"192x192",type:"image/png"},
      {url:"/icon-512.png",sizes:"512x512",type:"image/png"}
    ],
    apple:"/icon-192.png"
  },
  manifest:"/manifest.webmanifest"
};

export const viewport:Viewport={
  themeColor:"#07070b"
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
