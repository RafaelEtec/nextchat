import Link from "next/link"

const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img src="logo_nextchat_googleblack.png" alt="NextChat Logo" className="w-12 h-12" />
    </Link>
  )
}

export default LogoIcon