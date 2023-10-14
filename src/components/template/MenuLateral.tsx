import useAuth from "../../data/hook/useAuth";
import { IconBell, IconConfig, IconLogout, IconeHome } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral() {

  const { logout } = useAuth()
  return (
    <aside className="
    flex flex-col
    dark:bg-gray-900 
    text-gray-700 bg-gray-200">
      <div className="h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-800 flex flex-col items-center justify-center">
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" text="Inicio" icone={IconeHome} />
        <MenuItem url="configuracao" text="Configurações" icone={IconConfig} />
        <MenuItem url="notificacoes" text="Notificações" icone={IconBell} />
      </ul>
      <ul>
        <MenuItem
          className="text-red-600 dark:text-red-400 dark:hover:text-white hover:bg-red-400 hover:text-white"
          onClick={logout}
          text="Sair"
          icone={IconLogout}
        />
      </ul>
    </aside>
  );
}
