import { ProfileContext } from "./ProfileContext";
import Profile from "./Profile";
import ProfileAddress from "./ProfileAddress";
import { useState } from "react";
import ProfileForm from "./ProfileForm";

export default function ProfileApp(){
    const [name, setName] = useState("eko")
    return (
        <>
        <ProfileContext.Provider value={name}>
            <h1>profile</h1>
            <ProfileForm name={name} setName={setName}/>
            <Profile/>
            <ProfileAddress/>
        </ProfileContext.Provider>
        </>
    )
}