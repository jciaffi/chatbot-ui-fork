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



export const MenuProfile = ({}) => {

  const router = useRouter()
  const handleSignOut = async () => {
      await supabase.auth.signOut()
      router.push("/login")
      router.refresh()
      return
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconUser className='cursor-pointer' size='2em' />
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
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
