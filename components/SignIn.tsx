import { signIn } from 'next-auth/react';
import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
        <Link href={"#signin"} onClick={() => signIn('github')}
        className="bg-my-background rounded-xl h-12 font-medium text-white border-none text-lg font-bebas-neue border-2 flex flex-1 px-4 items-center justify-between"
        >
            <img src="github.svg" alt="Github icon" height={30} width={30}/>
            Entre com Github
            <div/>
        </Link>
    </div>
  )
}

export default SignIn