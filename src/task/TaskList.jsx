
export default function Task({items = []}){

    return (
        <div>
            <h1>List Task</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}