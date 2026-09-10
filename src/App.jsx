function Header({title}) {
  return (
    <h1 className="text-3xl font-bold text-gray-600 mb-6">{title}</h1>
  )
}

function Badge({text}){
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
      ${text === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
        {text}
    </span>
  )
}

function UserItem({nama, role, status}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <Badge text={status}/>
      <h3 className="text-lg font-semibold text-gray-800 mt-3">Nama: {nama}</h3>
      <p className="text-gray-500 mt-1">Role: {role}</p>
    </div>
  )
}

function UserList({users}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {users.map((user) => (
        <UserItem key={user.id} {...user}/>
      ))}
    </div>
  )
}



function App() {
  const dataUsers = [
  { id: 1, nama: "Riza", role: "Frontend Dev", status: "Active" },
  { id: 2, nama: "Budi", role: "UI/UX Designer", status: "Offline" },
  { id: 3, nama: "Siti", role: "Backend Dev", status: "Active" }
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header title="Dashboard Tim"/>
      <UserList users={dataUsers}/>
    </div>
    
  )
}

export default App                                                                                                                   
