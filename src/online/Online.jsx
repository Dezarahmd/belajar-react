import { useOnline } from "./OnlineHooks";

export default function Online(){
    const isOnline = useOnline

    return (
        <h1>
            {isOnline ? "online" : "offline"}
        </h1>
    )
}