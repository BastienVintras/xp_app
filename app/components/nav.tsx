"use client"

import Link from "next/link"
import LogoToque from "@/public/logotoque.png"
import Image from "next/image"
import { ThemeToggle } from "./themeToogle"
import React from 'react'

export default function Nav() {
  return (
    <nav className="max-w-[1200px] w-full mx-auto h-[80px] flex items-center justify-between p-5 border-b border-gray-300">
      <div>
        <Link href='/'>
        <Image width={30} height={30} src={LogoToque} alt="logo toque code"className="w-12 h-12 rounded-full"/>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle/>
      </div>


    </nav>
  )
}
