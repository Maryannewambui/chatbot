import React from "react"
import Chat from "./Chat"

const Home = () => {
  return (
    <main>
    <div className='pt-8'>
    <h1 className='text-6xl my-4 font-bold text-center'>chatbox</h1>
    </div>
    <Chat/>
    </main>
  )
}

export default Home