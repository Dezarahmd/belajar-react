function NotificationBell({ count }){
    return (
        <div className="relative inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
            <span className="text-2xl">🔔</span>
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                    {count}
                </span>
            )}
        </div>
    )
}

function PromoBanner({ isExpired, message }){
    if(isExpired){
        return null
    }

    return (
        <div className="bg-linear-to-r from-indigo-500 to-violet-500 text-white p-4 rounded-xl shadow-lg my-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="bg-white/20 p-2 rounded-lg text-sm font-semibold tracking-wider uppercase">Promo</span>
                    <p className="text-sm font-medium">{message}</p>
            </div>
            <button className="text-white/80 hover:text-white text-sm font-bold px-2 py-1">
                ✕
            </button>
        </div>
    )
}

export default function App() {
    return (
        <div className="max-w-md mx-auto p-6 bg-slate-50 min-h-screen flex flex-col justify-center gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Bagian A: Notification Bell</h2>
                <div className="flex gap-4 items-center">
                    <NotificationBell count={5} />
                    <NotificationBell count={0} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Bagian B: Promo Banner</h2>
                <PromoBanner isExpired={false} message="Diskon Spesial 50% untuk Pengguna Baru!" />
                <PromoBanner isExpired={true} message="Promo Lebaran Telah Berakhir." />
            </div>
        </div>
    )
}