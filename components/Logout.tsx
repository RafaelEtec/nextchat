import { signOut } from "next-auth/react"
import Link from "next/link"

const Logout = () => {
  return (
    <Link
      href={"/sign-in"} onClick={() => signOut()}
      className="relative z-20 flex items-center space-x-2 py-1"
    >
      <img src="/icons/logout3.svg" alt="Logout" className="w-12 h-12" />
    </Link>
  )
}

export default Logout