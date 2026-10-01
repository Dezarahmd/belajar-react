import Counter from "./Counter";
import {useState} from "react";

export default function CounterApp(){
    const [show2, setShow2] = useState(true);

    function handleChange(e){
        setShow2(e.target.checked);
    }

    return (
        <div>
            {show2 ? <Counter name="budi"/> : <Counter name="joko"/>}
            <input type="checkbox" checked={show2} onChange={handleChange}/> Tampilkan Counter 2
        </div>
    )
}