import { useState } from "react";


function StaticChild(){
    console.log("StaticChild dirender!")
    return (
        <>
        <p>Saya componen anak yang statis</p>
        </>
    )
}

function RenderTracker(){
    const [count, setCount] = useState(0)
    let renderCount = 0
    renderCount++

    function handleOnClick(){
        setCount(count + 1)
    }
    
    return (
        <div>
            <p>Nilai count statae: {count}</p>
            <p>Nilai renderCount: {renderCount}</p>
            <button onClick={handleOnClick}>Tambah Count</button>
            <StaticChild/>
        </div>
    )
}

export default function App(){
    return (
        <RenderTracker/>
    )
}