"use client"

import Link from "next/link"
import { FC } from "react"
import { ChatbotUISVG } from "../icons/chatbotui-svg"
import Image from "next/image"

// ajouté
import { ChatbotUIContext } from "@/context/context"
import { getComlisClient } from "@/lib/comlis"
import { useContext } from "react"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand = ({ theme = "dark", clientName }) => {
  // ajouté
  const { profile } = useContext(ChatbotUIContext)
  const comlisClient = getComlisClient(profile, clientName)

  return (
    <Link
      className="flex cursor-pointer flex-col items-center hover:opacity-50"
      href={comlisClient.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* <div className="mb-2">
        <ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />
      </div>

      <div className="text-4xl font-bold tracking-wide">Comlis Companion</div> */}
      <Image
        src={comlisClient.brandFileName}
        alt={comlisClient.name}
        width={250}
        height={250}
      />
    </Link>
  )
}
