import React from 'react'

const LoginForm = ({setIsLoggedIn}) => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 px-4'>
        <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all'>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>LOGIN</h1>
                <p className='mt-2 text-sm text-gray-600'>Halo, <span className='font-semibold text-indigo-600'>Dezar</span></p>
            </div>

            <div className='mt-8'>
                <button onClick={() => setIsLoggedIn(true)} className='w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:bg-inigo-700 hover:shadow-indigo-300 active:scale-[0.98'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default LoginForm