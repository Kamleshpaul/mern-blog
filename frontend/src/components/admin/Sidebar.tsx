import { FileEditIcon, FolderIcon, UsersIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";


const Links = ({ onClick }: { onClick?: () => void }) => {
  return (<>


    <NavLink
      className={({ isActive }) => `${isActive ? 'bg-slate-300 text-gray-900' : ''} flex items-center w-full p-3  gap-2 text-gray-500 transition-all rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
      to="/admin/blogs"
      onClick={onClick}
    >
      <FileEditIcon className="w-4 h-4" />
      Blog Posts
    </NavLink >

    <NavLink
      className={({ isActive }) => `${isActive ? 'bg-slate-300 text-gray-900' : ''} flex items-center w-full p-3  gap-2 text-gray-500 transition-all rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
      to="/admin/categories"
      onClick={onClick}
    >
      <FolderIcon className="w-4 h-4" />
      Categories
    </NavLink>

    <NavLink
      className={({ isActive }) => `${isActive ? 'bg-slate-300 text-gray-900' : ''} flex items-center w-full p-3  gap-2 text-gray-500 transition-all rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
      to="/admin/users"
      onClick={onClick}
    >
      <UsersIcon className="w-4 h-4" />
      Users
    </NavLink>
  </>
  )
}

export default function Sidebar() {

  const [open, setOpen] = useState(false)
  return (
    <>
      <Sheet open={open} onOpenChange={(state) => setOpen(state)}>

        <SheetTrigger className="absolute top-5 md:hidden left-5">
          <HamburgerMenuIcon className="w-5 h-5" onClick={() => setOpen(true)} />
        </SheetTrigger>
        <SheetContent side={'left'} className="w-[70%]">
          <nav className="py-6">
            <Links onClick={() => setOpen(false)} />
          </nav>
        </SheetContent>
      </Sheet>

      <nav className="hidden border-r w-[250px] bg-gray-100 md:flex flex-col items-start py-4 dark:bg-gray-800">
        <Links />
      </nav>
    </>
  )
}