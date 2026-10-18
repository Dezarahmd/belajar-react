
import React from "react";
import { useImmerReducer } from "use-immer";

// 1. Katalog produk statis, bukan state
const catalog = [
  { id: 1, name: "Kopi Arabika 250g", price: 85000 },
  { id: 2, name: "Gelas Keramik", price: 45000 },
  { id: 3, name: "French Press", price: 150000 },
];

// 2. State awal keranjang
const initialCart = {
  items: [],
  customer: {
    name: "",
    address: {
      city: "",
      zipcode: "",
    },
  },
  voucher: {
    code: "",
    discountPercent: 0,
    status: "idle",
  },
  status: "shopping",
};

// 3. Reducer menggunakan Immer
function cartReducer(draft, action) {
  switch (action.type) {
    case "item_added": {
      const product = action.payload;
      const existingItem = draft.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        if (existingItem.qty < 10) {
          existingItem.qty += 1;
        }
      } else {
        draft.items.push({
          ...product,
          qty: 1,
        });
      }

      draft.status = "shopping";
      break;
    }

    case "qty_decreased": {
      const item = draft.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          const index = draft.items.findIndex(
            (product) => product.id === action.payload
          );

          draft.items.splice(index, 1);
        }
      }

      break;
    }

    case "item_removed": {
      const index = draft.items.findIndex(
        (item) => item.id === action.payload
      );

      if (index !== -1) {
        draft.items.splice(index, 1);
      }

      break;
    }

    case "customer_name_changed": {
      draft.customer.name = action.payload;
      break;
    }

    case "city_changed": {
      draft.customer.address.city = action.payload;
      break;
    }

    case "zipcode_changed": {
      draft.customer.address.zipcode = action.payload;
      break;
    }

    case "voucher_code_changed": {
      draft.voucher.code = action.payload;
      draft.voucher.status = "idle";
      draft.voucher.discountPercent = 0;
      break;
    }

    case "voucher_applied": {
      if (draft.voucher.code.trim().toUpperCase() === "HEMAT10") {
        draft.voucher.discountPercent = 10;
        draft.voucher.status = "applied";
      } else if (
        draft.voucher.code.trim().toUpperCase() === "HEMAT25"
      ) {
        draft.voucher.discountPercent = 25;
        draft.voucher.status = "applied";
      } else {
        draft.voucher.discountPercent = 0;
        draft.voucher.status = "invalid";
      }

      break;
    }

    case "checked_out": {
      const hasItems = draft.items.length > 0;
      const hasName = draft.customer.name.trim() !== "";
      const hasCity = draft.customer.address.city.trim() !== "";

      if (hasItems && hasName && hasCity) {
        draft.status = "checked_out";
      } else {
        draft.status = "failed";
      }

      break;
    }

    case "cart_reset": {
      // Immer tidak melacak penugasan ulang variabel draft.
      // Karena itu, reset dilakukan dengan mengganti isi draft.
      Object.assign(draft, {
        items: [],
        customer: {
          name: "",
          address: {
            city: "",
            zipcode: "",
          },
        },
        voucher: {
          code: "",
          discountPercent: 0,
          status: "idle",
        },
        status: "shopping",
      });

      break;
    }

    default:
      throw new Error(`Action tidak dikenal: ${action.type}`);
  }
}

/*
JAWABAN PERTANYAAN WAJIB

1. Kenapa subtotal, diskon, dan total tidak disimpan di state?

Karena ketiganya merupakan nilai turunan dari items dan discountPercent.
Nilainya bisa dihitung kembali setiap render.

Jika disimpan di state, nilainya bisa tidak sinkron ketika qty, item,
atau voucher berubah. Akibatnya, total pembayaran bisa salah.

2. Kenapa tidak bisa menulis draft = initialCart?

Karena penugasan tersebut hanya mengubah variabel lokal draft,
bukan memutasi draft yang sedang dilacak Immer.

Reset harus dilakukan dengan memutasi properti draft,
misalnya menggunakan Object.assign(draft, initialCart versi reset).

3. Versi manual city_changed tanpa Immer:

case "city_changed":
  return {
    ...state,
    customer: {
      ...state.customer,
      address: {
        ...state.customer.address,
        city: action.payload,
      },
    },
  };

Dibutuhkan 3 level spread:
- Level 1: state
- Level 2: customer
- Level 3: address

Catatan: versi manual menggunakan state biasa, bukan draft Immer.
*/

// 4. Component CheckoutPage
export default function CheckoutPage() {
  const [cart, dispatch] = useImmerReducer(
    cartReducer,
    initialCart
  );

  // Nilai turunan: tidak disimpan dalam state
  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const discount =
    (subtotal * cart.voucher.discountPercent) / 100;

  const total = subtotal - discount;

  // Format rupiah
  const formatRupiah = (number) =>
    `Rp ${number.toLocaleString("id-ID")}`;

  function handleCheckout(event) {
    event.preventDefault();
    dispatch({ type: "checked_out" });
  }

  function handleReset() {
    dispatch({ type: "cart_reset" });
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            ClassShop
          </h1>
          <p className="mt-2 text-slate-600">
            Keranjang belanja dan checkout sederhana.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Katalog produk */}
          <section className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-bold">
                Katalog Produk
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {catalog.map((product) => (
                  <article
                    key={product.id}
                    className="rounded-lg border border-slate-200 p-4"
                  >
                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="my-3 text-lg font-bold text-blue-700">
                      {formatRupiah(product.price)}
                    </p>

                    <button
                      type="button"
                      disabled={cart.status === "checked_out"}
                      onClick={() =>
                        dispatch({
                          type: "item_added",
                          payload: product,
                        })
                      }
                      className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      Tambah ke Keranjang
                    </button>
                  </article>
                ))}
              </div>
            </div>

            {/* Keranjang */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-bold">
                Keranjang Belanja
              </h2>

              {cart.items.length === 0 ? (
                <p className="rounded-lg bg-slate-50 p-5 text-center text-slate-500">
                  Keranjang kamu masih kosong.
                </p>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <article
                      key={item.id}
                      className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {formatRupiah(item.price)} × {item.qty}
                        </p>

                        <p className="mt-1 font-bold">
                          Subtotal:{" "}
                          {formatRupiah(item.price * item.qty)}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={cart.status === "checked_out"}
                          onClick={() =>
                            dispatch({
                              type: "qty_decreased",
                              payload: item.id,
                            })
                          }
                          className="h-9 w-9 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-50"
                          aria-label={`Kurangi ${item.name}`}
                        >
                          -
                        </button>

                        <span className="min-w-6 text-center font-semibold">
                          {item.qty}
                        </span>

                        <button
                          type="button"
                          disabled={
                            item.qty >= 10 ||
                            cart.status === "checked_out"
                          }
                          onClick={() =>
                            dispatch({
                              type: "item_added",
                              payload: {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                              },
                            })
                          }
                          className="h-9 w-9 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`Tambah ${item.name}`}
                        >
                          +
                        </button>

                        <button
                          type="button"
                          disabled={cart.status === "checked_out"}
                          onClick={() =>
                            dispatch({
                              type: "item_removed",
                              payload: item.id,
                            })
                          }
                          className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700 hover:bg-red-200 disabled:opacity-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Form checkout */}
          <aside>
            <form
              onSubmit={handleCheckout}
              className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
            >
              <section>
                <h2 className="mb-4 text-xl font-bold">
                  Data Pengiriman
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="mb-1 block text-sm font-medium"
                    >
                      Nama Lengkap
                    </label>

                    <input
                      id="customerName"
                      type="text"
                      value={cart.customer.name}
                      disabled={cart.status === "checked_out"}
                      onChange={(event) =>
                        dispatch({
                          type: "customer_name_changed",
                          payload: event.target.value,
                        })
                      }
                      placeholder="Masukkan nama"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-1 block text-sm font-medium"
                    >
                      Kota
                    </label>

                    <input
                      id="city"
                      type="text"
                      value={cart.customer.address.city}
                      disabled={cart.status === "checked_out"}
                      onChange={(event) =>
                        dispatch({
                          type: "city_changed",
                          payload: event.target.value,
                        })
                      }
                      placeholder="Masukkan kota"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipcode"
                      className="mb-1 block text-sm font-medium"
                    >
                      Kode Pos
                    </label>

                    <input
                      id="zipcode"
                      type="text"
                      value={cart.customer.address.zipcode}
                      disabled={cart.status === "checked_out"}
                      onChange={(event) =>
                        dispatch({
                          type: "zipcode_changed",
                          payload: event.target.value,
                        })
                      }
                      placeholder="Masukkan kode pos"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </section>

              {/* Voucher */}
              <section>
                <h2 className="mb-3 text-lg font-bold">
                  Kode Voucher
                </h2>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cart.voucher.code}
                    disabled={cart.status === "checked_out"}
                    onChange={(event) =>
                      dispatch({
                        type: "voucher_code_changed",
                        payload: event.target.value,
                      })
                    }
                    placeholder="Contoh: HEMAT10"
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                  />

                  <button
                    type="button"
                    disabled={cart.status === "checked_out"}
                    onClick={() =>
                      dispatch({ type: "voucher_applied" })
                    }
                    className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50"
                  >
                    Pakai
                  </button>
                </div>

                {cart.voucher.status === "applied" && (
                  <p className="mt-2 text-sm text-green-600">
                    Voucher berhasil digunakan! Diskon{" "}
                    {cart.voucher.discountPercent}%.
                  </p>
                )}

                {cart.voucher.status === "invalid" && (
                  <p className="mt-2 text-sm text-red-600">
                    Voucher tidak valid.
                  </p>
                )}
              </section>

              {/* Ringkasan pembayaran */}
              <section className="space-y-3 border-t border-slate-200 pt-5">
                <h2 className="text-xl font-bold">
                  Ringkasan Belanja
                </h2>

                <div className="flex justify-between gap-3 text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {formatRupiah(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span>
                    Potongan Diskon (
                    {cart.voucher.discountPercent}%)
                  </span>
                  <span className="font-medium text-green-600">
                    -{formatRupiah(discount)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-t border-slate-200 pt-3 text-lg font-bold">
                  <span>Total Bayar</span>
                  <span className="text-blue-700">
                    {formatRupiah(total)}
                  </span>
                </div>
              </section>

              {/* Status checkout */}
              {cart.status === "failed" && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  Checkout gagal. Pastikan keranjang terisi dan
                  data pengiriman lengkap.
                </p>
              )}

              {cart.status === "checked_out" && (
                <p
                  role="status"
                  className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
                >
                  Pesanan berhasil dibuat untuk{" "}
                  {cart.customer.name}!
                </p>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={cart.status === "checked_out"}
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  Checkout
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold hover:bg-slate-100"
                >
                  Reset
                </button>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}
