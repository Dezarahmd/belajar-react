
function Button(props) {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    red: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
    green: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
  }
  return (
    <button className={`${colorClasses[props.color]} text-white font-bold py-2 px-4 rounded-lg shadow transition`}>{props.label}</button>
  )
} 


function App(){
  return (
    <div className='flex gap-3 p-5'>
      <Button label='Beli Sekarang' color='blue'/>
      <Button label="Hapus" color="red" />
      <Button label="Tambah ke keranjang" color="green" />      
    </div>
  )
}

export default App                                                                                                                              
