import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";

export default function ProfileAddress(){
    const profile = useContext(ProfileContext)
    return (
        <>
            <h2>Profile address</h2>
            <p>alamat {profile}</p>
        </>
    )
}