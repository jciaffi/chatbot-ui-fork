"use client"

import Link from "next/link"
import { FC, useEffect } from "react"
import { ChatbotUISVG } from "../icons/chatbotui-svg"
import Image from "next/image"

// ajouté
import { ChatbotUIContext } from "@/context/context"
import { DjangoContext } from "@/context/djangoProfile" // COMLIS
import { clients } from "@/lib/comlis" // comlis
import { useContext } from "react"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand = ({ theme = "dark", clientName }) => {
  // Comlis
  // TODO : should get this in django
  const { profile, chatSettings } = useContext(ChatbotUIContext)
  const { djangoProfile, getComlisClient } = useContext(DjangoContext)
  let comlisClient
  if (clientName) {
    comlisClient = clients[clientName]
  } else {
    // user is logged in. clientName is only used for login page
    comlisClient = getComlisClient(chatSettings)
  }

  return (
    <>
      {/* <a
        className="flex cursor-pointer flex-col items-center hover:opacity-50"
        href={comlisClient.url}
        target="_blank"
        rel="noopener noreferrer"
      > */}
      {/* <div className="mb-2">
          <ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />
        </div>

        <div className="text-4xl font-bold tracking-wide">Comlis Companion</div> */}
      <div className="flex flex-col items-center">
        <Image
          src={"/" + comlisClient?.brandFileName}
          alt={comlisClient?.name}
          width={250}
          height={250}
        />
      </div>
      {/* </a> */}
      <a
        className="talic flex cursor-pointer flex-col items-center text-xs hover:opacity-50"
        href="https://comlis.io/"
      >
        IA companion by Comlis
      </a>
    </>
  )
}
