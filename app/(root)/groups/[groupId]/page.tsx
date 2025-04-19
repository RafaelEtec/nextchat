import React from 'react';

const page = async ({ params }: { params: Promise<{ groupId: string }> }) => {
    const id = (await params).groupId;

    return (
        <>
            <div>page {id}</div>
        </>
    )
}

export default page