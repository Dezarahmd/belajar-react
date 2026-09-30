
import { useImmer } from "use-immer"
import TaskForm from "./TaskForm"

export default function Task(){
    const [items, setItems] = useImmer([])

    function handleOnSubmit(item){
        setItems((draft) => {
            draft.push(item)
        })
    }

    return (
        <div>
            <TaskForm onSubmit={handleOnSubmit}/>
            <TaskList items={items}/>
        </div>
    )
}