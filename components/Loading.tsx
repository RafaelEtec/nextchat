import SignIn from "./SignIn"

const Loading = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl p-2 md:p-10">
        <div className="flex flex-1 gap-2 items-end justify-center">
            <div className="h-fit w-full rounded-lg space-y-2 lg:w-[24rem]">
              <div className="flex flex-col gap-2 w-full items-center">
                <img src="logo_nextchat_nobg.png" alt="NextChat Logo" width={200} height={200}/>
                <h1 className="font-bebas-neue text-5xl text-my-blue">Bem Vindo ao NextChat</h1>
              </div>
              <SignIn provider="github" />
              <SignIn provider="google" />
            </div>
        </div>
        <div className="flex gap-2 mt-4">
          {[...new Array(3)].map((i, idx) => (
            <div
              key={"first-array-demo-1" + idx}
              className="h-20 w-full animate-pulse rounded-lg bg-my-blue"
            />
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          <div className="h-full w-full animate-pulse rounded-lg bg-my-background"/>
        </div>
      </div>
    </div>
  )
}

export default Loading