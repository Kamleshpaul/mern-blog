import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Package2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Header() {

  const navigate = useNavigate();

  return (
    <header className="flex items-center h-16 px-4 border-b">

      <Link className="items-center hidden gap-2 font-semibold md:flex" to="/admin">
        <Package2Icon className="w-6 h-6" />
        <span className="">Blog</span>
      </Link>

      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <Button
            className="w-10 h-10 ml-auto border border-gray-200 rounded-full dark:border-gray-800"
            id="profile"
            size="icon"
            variant="ghost"
          >

            <Avatar className="w-9 h-9">
              <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>UA</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            navigate('/login');
          }}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>



    </header>
  )
}

