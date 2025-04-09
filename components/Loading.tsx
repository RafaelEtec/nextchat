const Loading = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl p-2 md:p-10 ">
        <div className="flex gap-2">
          {[...new Array(4)].map((i, idx) => (
            <div
              key={"first-array-demo-1" + idx}
              className="h-20 w-full animate-pulse rounded-lg bg-my-blue"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          <div className="h-full w-full animate-pulse rounded-lg bg-google-black">
            <div className="">

            </div>
          </div>
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(3)].map((i, idx) => (
            <div
              key={"second-array-demo-1" + idx}
              className="h-full w-full animate-pulse rounded-lg bg-google-black"
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading