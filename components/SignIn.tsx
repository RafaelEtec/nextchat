import { signIn } from 'next-auth/react';
import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
        <Link href={"#"} onClick={() => signIn('github')}
        className="bg-my-background rounded-xl h-12 font-medium text-white border-none text-lg border-2 flex flex-1 justify-between px-4 items-center"
        >
            <img src="github.svg" alt="Github icon" height={30} width={30}/>
            Entre com Github
        </Link>
    </div>
  )
}

export default SignIn