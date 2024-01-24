import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IconLogout, IconUser} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/browser-client"
import { ThemeSwitcher } from "@/components/utility/theme-switcher"
// fin qq imports en plus


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
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconUser/>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item><ThemeSwitcher /></DropdownMenu.Item>
          <DropdownMenu.Item>
            <Button
                tabIndex={-1}
                className="text-xs"
                size="sm"
                onClick={handleSignOut}
                >
              <IconLogout className="mr-1" size={20} />
              Logout
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}
