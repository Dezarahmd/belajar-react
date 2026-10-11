import React from "react"

const UserProfile = ({ isLoggedIn, setIsLoggedIn}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl text-center transition-all">
        {isLoggedIn ? (
          <div>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {/* Indikator titik hijau untuk status online */}
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Welcome, <span className="text-indigo-600">Dezar</span>
            </h2>
            
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              status: online
            </div>
            <div className="mt-2">
                <button className="bg-red-500 px-4 py-2 rounded-md text-white" onClick={() => setIsLoggedIn(false)}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-base font-medium text-gray-700">Silahkan Login terlebih dahulu</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile