import Link from "next/link";

interface MenuIntensProps {
  url?: string;
  text: string;
  icone: any;
  className?: string;
  onClick?: (evento: any) => void
}

export default function MenuItem(props: MenuIntensProps) {
  function renderizarLink() {
    return (
      <a className={`flex flex-col justify-center items-center h-20 w-20 text-gray-600 dark:text-gray-200 ${props.className}`}>
      {props.icone}
      <span className="text-xs font-light">{props.text}</span>
    </a>
    )
  }
  return (
    <li onClick={props.onClick} className="hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-800">
      {props.url ? (
      <Link href={props.url} legacyBehavior>
       {renderizarLink()}
      </Link>

      ) : (
        renderizarLink()
      )}
    </li>
  );
}
