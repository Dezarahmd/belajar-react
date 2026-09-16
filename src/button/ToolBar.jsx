export default function Toolbar({onClick}){
    return (
        <div onClick={onClick} className="bg-red-500">
            <button onClick={onClick}>Satu</button>
            <button onClick={onClick}>Dua</button>
        </div>
    )
}