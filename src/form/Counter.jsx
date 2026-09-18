import { useState } from "react";

export default function Counter(){
    let [counter, setCounter] = useState(0)

    function hendleClick(){
        setCounter(counter + 1)
        console.log(counter)
    }

    return (
        <div>
            <div>
                <button onClick={hendleClick}>Increment</button>
            </div>
            <h1>Counter: {counter}</h1>
        </div>
    )
}