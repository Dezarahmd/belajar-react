import { createContext, useState } from "react";

export const KeranjangContext = createContext();

function KeranjangProvider({ children }) {
  const [keranjang, setKeranjang] = useState([]);

  function tambahKeranjang(produk) {
    const produkDiKeranjang = keranjang.find((item) => item.id === produk.id);

    if (produkDiKeranjang) {
      setKeranjang(
        keranjang.map((item) =>
          item.id === produk.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      setKeranjang([...keranjang, { ...produk, quantity: 1 }]);
    }
  }

  function tambahJumlah(id) {
    setKeranjang(
      keranjang.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function kurangiJumlah(id) {
    setKeranjang(
      keranjang
        .filter((item) => {
          if (item.id === id && item.quantity === 1) {
            return false;
          } else {
            return true;
          }
        })
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        }),
    );
  }

  function hapusProduk(id) {
    setKeranjang(
        keranjang.filter((item) => {
            if (item.id !== id) {
                return true
            } else {
                return false
            }
        })
    )
  }

  return (
    <KeranjangContext.Provider
      value={{ keranjang, setKeranjang, tambahKeranjang, tambahJumlah, kurangiJumlah, hapusProduk }}
    >
      {children}
    </KeranjangContext.Provider>
  );
}

export default KeranjangProvider;
