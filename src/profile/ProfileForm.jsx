export default function ProfileForm({name, setName}){

    function handleChange(e){
        setName(e.target.value)
    }
    return (
        <>
            <h2>Profile form</h2>
            <input type="text" value={name} onChange={handleChange}/>
        </>
    )
}