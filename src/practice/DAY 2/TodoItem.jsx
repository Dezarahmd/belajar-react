function TodoItem({ task, done }) {
    return (
        <li className={`py-2 px-3 rounded-lg transition-colors ${
            done ? "line-through text-slate-400 bg-slate-50" : "text-slate-800 font-medium"
        }`}>
            {task}
        </li>
    );
}

function TodoList({ todos }) {
    return (
        <ul className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md border border-slate-100 space-y-2">
            {todos.map((todo) => (
                <TodoItem key={todo.id} task={todo.task} done={todo.done} />
            ))}
        </ul>
    );
}

export default function App() {
    const todos = [
        {
            id: 1,
            task: "belajar riek",
            done: true
        },
        {
            id: 2,
            task: "Ngerjain tugas",
            done: false
        },
        {
            id: 3,
            task: "Commit git",
            done: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <TodoList todos={todos} />
        </div>
    );
}