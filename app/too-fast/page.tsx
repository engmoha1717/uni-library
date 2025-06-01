import React from 'react'

const page = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-4xl text-red-50 font-bold text-center mt-8'>
            whoa , slow down there is speed 
        </h1>
        <p className='text-xl text-red-50 text-center mt-4'>
            looks like you&apos;ve going too fast ,we&apos;ll wait for you
            temporary pause on your excitement
        </p>
    </main>
  )
}

export default page