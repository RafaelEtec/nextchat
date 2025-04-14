import React from 'react'

const page = () => {
  
  return (
    <section className="w-full rounded-2xl p-11 flex-1 justify-between lg:flex">
      <div className="w-auto">
        <h2 className="text-xl font-semibold text-google-grey font-roboto pb-8">Amigos</h2>
        {[...new Array(4)].map((i, idx) => (
            <div key={"first-array-demo-1" + idx} className="flex flex-1 space-x-2 justify-start space-y-2">
                <div className="h-20 w-20 animate-pulse rounded-full bg-google-black"></div>
                <div className="space-y-2">
                    <div className="h-5 w-40 animate-pulse rounded-sm bg-google-black"></div>
                    <div className="h-5 w-20 animate-pulse rounded-sm bg-google-black"></div>
                </div>
            </div>
        ))}
      </div>

      <div className="w-auto">
        <h2 className="text-xl font-semibold text-google-grey font-roboto pb-8">Solicitações</h2>
        {[...new Array(9)].map((i, idx) => (
            <div key={"first-array-demo-1" + idx} className="flex flex-1 space-x-2 justify-start space-y-2">
                <div className="h-20 w-20 animate-pulse rounded-full bg-google-black"></div>
                <div className="space-y-2">
                    <div className="h-5 w-40 animate-pulse rounded-sm bg-google-black"></div>
                    <div className="h-5 w-20 animate-pulse rounded-sm bg-google-black"></div>
                </div>
            </div>
        ))}
      </div>
    </section>
  )
}

export default page