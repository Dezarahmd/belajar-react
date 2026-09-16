function getButtonStyle(isLoggedIn) {
    if (isLoggedIn) {
        return "px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-sm";
    } else {
        return "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-sm w-full";
    }
}

function AuthButton({ isLoggedIn, username}){
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-100 my-3">
            {isLoggedIn ? (
                <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Halo, {username}</span>
                    <button className={getButtonStyle(isLoggedIn)}>Logout</button>
                </div>
            ) : (
                <div className="flex justify-center">
                    <button className={getButtonStyle(isLoggedIn)}>
                        Login
                    </button>
                </div>
            )
        }
        </div>
    )
}


function App() {
    return (
        <div className="max-w-md mx-auto bg-slate-50 min-h-screen flex flex-col justify-center">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Auth State Test</h2>
            <AuthButton isLoggedIn={true} username="Fikri"/>
            <AuthButton isLoggedIn={false} username="Asikk"/>
        </div>
    )
}

export default App