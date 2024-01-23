import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Link from "next/link"
import { Toaster } from "sonner"
import Image from "next/image"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="flex items-center justify-between p-4 text-gray-800 shadow-sm fixed w-full bg-black">
        <div className="flex items-center space-x-2">
          <Link href="/" className="cursor-pointer">
            <Image
              alt="Logo"
              className="rounded-full"
              height={30}
              src="/globoticket-horizontal-white.svg"
              width={200}
            />
          </Link>
          {/* <span className="text-md font-bold">EventBook</span> */}
        </div>
      </nav>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </>
  )
}
