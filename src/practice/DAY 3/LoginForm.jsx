function isValidEmail(email){
    return email.includes('@')
}

function LoginForm(){

    function handleSubmit(e){
        e.preventDefault()
        const email = e.target.email.value
        
        if (isValidEmail(email)) {
            console.log("Email valid, login diproses...");
            } else {
            console.log("Format email tidak valid!");
            }
    }


    function handleForgotPassword(e){
        console.log("BukaHalaman")
        e.stopPropagation()
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="example@gmail.com" className="border-2 rounded-lg p-2 outline-none focus:border-green-500"/>
                <span className="text-sm text-gray-500 cursor-pointer hover:underline hover:text-gray-600" onClick={handleForgotPassword}>Lupa password?</span>
                <button type="submit" className="bg-green-500 px-4 py-2 rounded-md text-slate-700 font-medium hover:bg-green-600 transition-colors">Kirim</button>
            </form>
        </div>
    )
}

export default function App(){
    return (
        <LoginForm/>
    )
}