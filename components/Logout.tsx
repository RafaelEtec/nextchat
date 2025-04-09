import Link from "next/link"

const Logout = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1"
    >
      <img src="logout2.svg" alt="Logout" className="w-12 h-12" />
    </Link>
  )
}

export default Logout