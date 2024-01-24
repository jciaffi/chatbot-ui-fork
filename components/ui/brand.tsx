"use client"

import Link from "next/link"
import { FC } from "react"
import { ChatbotUISVG } from "../icons/chatbotui-svg"
import Image from "next/image"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  return (
    <Link
      className="flex cursor-pointer flex-col items-center hover:opacity-50"
      href="https://pharmnaturemicronutrition.fr/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* <div className="mb-2">
        <ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />
      </div>

      <div className="text-4xl font-bold tracking-wide">Comlis Companion</div> */}
      <Image
        src="/logo-pharm-nature-micronutrition-2021.svg"
        width={500}
        height={500}
        alt="PharmNature"
      />
    </Link>
  )
}
