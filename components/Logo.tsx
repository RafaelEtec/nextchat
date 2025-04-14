import { motion } from "motion/react"
import Link from "next/link"

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex flex-row items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img src="logo_nextchat_googleblack.png" alt="NextChat Logo" className="w-16 h-16" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-normal font-bebas-neue whitespace-pre text-my-blue text-3xl"
      >
        NextChat
      </motion.span>
    </Link>
  )
}

export default Logo