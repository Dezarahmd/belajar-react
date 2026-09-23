import { useState } from "react";

function SnapshotDemo(){
    const [count, setCount] = useState(0)

    function handleTripleClick(){
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
    }

    function handleTripleClickFixed(){
            setCount(prev => prev + 1)
            setCount(prev => prev + 1)
            setCount(prev => prev + 1)
    }

    return (
        <div className="p-4">
            <h2>Snapshot demo component</h2>
            <p>Nilai Count saat ini: {count}</p>
            <div className="mb-2">
                <button onClick={handleTripleClick}>Triple click biasa</button>
            </div>
            <div>
                <button onClick={handleTripleClickFixed}>Triple click fixed</button>
            </div>
        </div>
    )
}

export default function App(){
    return (
        <SnapshotDemo/>
    )
}

