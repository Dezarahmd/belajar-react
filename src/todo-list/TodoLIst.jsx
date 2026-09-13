import Todo from './Todo';

export default function TodoList() {
    const data = [
        {
            id: 0,
            text: "Learn react from 0",
            isCompleted: true
        },
        {
            id: 1,
            text: "Learn JS from 0",
            isCompleted: true
        },
        {
            id: 2, 
            text: "Learn CSS from 0",
            isCompleted: false,
        }
    ]

    const todos = data.map((todo) => {
        return <Todo key={todo.id} {...todo}/>
    })
    return (
        <ul>
            {todos}
        </ul>
    )
}