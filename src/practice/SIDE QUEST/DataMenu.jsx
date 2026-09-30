import ItemMenu from "./ItemMenu";

export default function DataMenu(){
    const menu = [
        { id: 1, nama: "Nasi Goreng", harga: 25000, tersedia: true,  diskon: 10 },
        { id: 2, nama: "Mie Ayam",    harga: 20000, tersedia: false, diskon: 0 },
        { id: 3, nama: "Sate Ayam",   harga: 30000, tersedia: true,  diskon: 0 },
        { id: 4, nama: "Es Teh",      harga: 5000,  tersedia: true,  diskon: 20 },
    ];
    return (
        menu.map((menu) => (
            <ItemMenu key={menu.id} {...menu}/>
        ))
    )
}