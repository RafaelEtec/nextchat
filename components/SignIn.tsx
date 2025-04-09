import { signIn } from 'next-auth/react';
import Link from 'next/link';

const SignIn = ({
  open,
  provider,
}: {
  open: boolean,
  provider: string
}) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Link href={"#signin"} onClick={() => signIn(`${provider}`)}
      className="bg-my-background rounded-full h-12 space-x-1 font-medium line-clamp-1 text-white border-none text-lg font-bebas-neue border-2 flex flex-1 px-2 items-center justify-between"
      >
          <img src={`${provider}.svg`} alt={`${provider} icon`} height={30} width={30}/>
          {open && <>Entre com {provider}</>}
          <img src="clickme.svg" alt="Click me" height={20} width={20}/>
      </Link>
    </div>
  )
}

export default SignIn