import React from 'react'

const Solicitacoes = ({ user }: { user: User }) => {
  return (
    <div className="flex space-x-2 justify-start space-y-2 pr-4">
        <img src={user.image} alt="Friend Avatar" className="h-20 w-20 rounded-full bg-google-black"/>
        <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    </div>
  )
}

export default Solicitacoes