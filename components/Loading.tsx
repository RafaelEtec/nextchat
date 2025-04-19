import SignIn from "./SignIn"

const Loading = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl p-2 md:p-10">
        <div className="flex flex-col gap-2 items-end justify-center">
            <div className="flex flex-col w-full items-center space-y-8">
              <img src="/images/logo_nextchat_nobg.png" alt="NextChat Logo" width={200} height={200}/>
              <div className="justify-center items-center w-full">
                <p className="font-bebas-neue text-5xl text-my-blue text-center">Bem Vindo ao NextChat</p>
              </div>
            </div>
            <div className="h-fit w-full rounded-lg space-y-2 lg:w-[24rem] justify-center">
              <SignIn provider="github" />
              <SignIn provider="google" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Loading