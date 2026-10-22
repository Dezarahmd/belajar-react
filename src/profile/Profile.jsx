import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";

export default function Profile(){
    const profile = useContext(ProfileContext)
    return (
        <>
            <h2>Profile</h2>
            <p>hello {profile}</p>
        </>
    )
}