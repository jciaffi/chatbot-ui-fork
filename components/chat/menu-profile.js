import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { IconLogout, IconUser} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/browser-client"
import { ThemeSwitcher } from "@/components/utility/theme-switcher"

import { ChatbotUIContext } from "@/context/context"
import { getComlisClient } from "@/lib/comlis"
import { useContext } from "react"
import { DjangoContext } from "@/context/djangoProfile" // COMLIS

export const MenuProfile = ({}) => {

  const { profile, chatSettings } = useContext(ChatbotUIContext)

  // Comlis
  const {djangoProfile, getComlisClient} = useContext(DjangoContext)
  const comlisClient = getComlisClient(chatSettings)
  
  const router = useRouter()
  const handleSignOut = async () => {
      await supabase.auth.signOut()
      router.push(`/${comlisClient.slugURL}/login`)
      router.refresh()
      return
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconUser className='cursor-pointer' size={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><ThemeSwitcher /></DropdownMenuItem>
          <DropdownMenuItem>
            <Button
                tabIndex={-1}
                className="text-xs"
                size="sm"
                onClick={handleSignOut}
                >
              <IconLogout className="mr-1" size={20} />
              Deconnexion
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
