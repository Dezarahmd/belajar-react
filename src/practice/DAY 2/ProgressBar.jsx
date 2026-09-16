function ProgressBar({ percent }) {
    // Membatasi nilai persen agar tetap berada di rentang 0 - 100
    const clampedPercent = Math.min(Math.max(percent, 0), 100);

    return (
        <div className="w-full my-4">
            <div className="flex justify-between mb-1 text-sm font-medium text-slate-700">
                <span>Progress</span>
                <span>{clampedPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner border border-slate-200">
                <div 
                    className="bg-linear-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{ width: `${clampedPercent}%` }}
                ></div>
            </div>
        </div>
    )
}

function App() {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Task Statistics</h2>
            <ProgressBar percent={30} />
            <ProgressBar percent={75} />
            <ProgressBar percent={100} />
        </div>
    )
}

export default App