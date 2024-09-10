"use client"

import Image from "next/image";
import Link from "next/link";
import LogoToque from "@/public/logotoque.png"
import { Typewriter, Cursor } from "react-simple-typewriter";
import ButtonProvider from "./components/ButtonProvider";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function Home() {

const {data : session} = useSession()

if(session){
  redirect("/dashboard/notes")
}



  return (
  <section className="w-full h-screen flex items-center justify-center flex-col gap-6" >
    <Image width={200} height={100} alt="logo toque code" src={LogoToque} className="mb-4 object-contain rounded-full"/>
    <h1 className="text-4xl md:text-6xl font-black mb-2 text-center uppercase flex items-center">
      <Typewriter typeSpeed={50} delaySpeed={1000} loop={false} words={["partages","expériences","connaissances"]}/>
      <span><Cursor/></span>

    </h1>
      <p className="my-2 text-center font-bold">Avançons plus loin à plusieurs !!</p>
      <ButtonProvider/>

  </section>
  );
}