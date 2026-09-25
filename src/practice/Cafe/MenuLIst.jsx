// Komponen MenuList untuk melakukan looping data array
import MenuItem from "./MenuItem";
export default function MenuList({ daftarMenu, onAddToCart }) {
  return (
    // Menggunakan CSS Grid agar card menu tersusun rapi (2 kolom di layar medium, dst)
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Melakukan looping (mapping) dari array data menu */}
      {daftarMenu.map((menu, index) => (
        <MenuItem 
          key={index} // React butuh key unik saat looping
          nama={menu.nama}
          kategori={menu.kategori}
          harga={menu.harga}
          status={menu.status}
          onAddToCart = {onAddToCart}
        />
      ))}
    </div>
  );
}