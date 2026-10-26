import { useState, useRef } from "react";

export default function Timer() {
    const [start, setStart] = useState(null);
    const [now, setNow] = useState(null);
    const timer = useRef(null);

    function handleStart() {
        // Hentikan interval sebelumnya jika ada, agar tidak menumpuk
        clearInterval(timer.current);

        const currentTime = Date.now();
        setStart(currentTime);
        setNow(currentTime);

        timer.current = setInterval(() => {
            setNow(Date.now());
        }, 10);
    }

    function handleStop() {
        clearInterval(timer.current);
    }

    // Hitung durasi waktu (jika start dan now ada)
    let secondsPassed = 0;
    if (start !== null && now !== null) {
        secondsPassed = now - start;
    }

    return (
        <>
            <h1>Timer : {secondsPassed} ms</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </>
    );
}