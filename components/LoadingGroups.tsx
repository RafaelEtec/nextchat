const LoadingGroups = ({
    open,
}: {
    open: boolean
}) => {
    return (
        <div className="flex flex-col gap-2 items-start">
            {open ? (
                [...new Array(12)].map((i, idx) => (
                    <div key={"first-array-demo-1" + idx} className="flex flex-1 space-x-2 justify-start">
                        <div className="h-20 w-20 animate-pulse rounded-full bg-my-background"></div>
                        <div className="space-y-2">
                            <div className="h-5 w-40 animate-pulse rounded-sm bg-my-background"></div>
                            <div className="h-5 w-20 animate-pulse rounded-sm bg-my-background"></div>
                        </div>
                    </div>
                ))
            ) : (
                [...new Array(12)].map((i, idx) => (
                    <div key={"first-array-demo-1" + idx} className="flex flex-1 justify-start">
                        <div className="h-20 w-20 animate-pulse rounded-full bg-my-background"></div>
                    </div>
                ))
            )}
        </div>
    )
}

export default LoadingGroups