import { useReducer } from "react";

// FIX: naming variable biasa pakai huruf kecil di depan (initialState, bukan InitialState)
const initialState = {
  nama: "Dewa 19",
  harga: 200000,
  jumlah: 1,
};

const MIN_TICKET = 1;
const MAX_TICKET = 5;

function ticketReducer(state, action) {
  switch (action.type) {
    case "increment":
      // FIX: kalau sudah di batas, return state apa adanya (reference sama),
      // jadi React tahu tidak ada perubahan dan bisa skip re-render
      if (state.jumlah >= MAX_TICKET) return state;
      return { ...state, jumlah: state.jumlah + 1 };

    case "decrement":
      if (state.jumlah <= MIN_TICKET) return state;
      return { ...state, jumlah: state.jumlah - 1 };

    case "reset":
      // FIX: pakai initialState, bukan angka 1 yang di-hardcode lagi
      return initialState;

    default:
      throw new Error(`Action tidak dikenal: ${action.type}`);
  }
}

function TicketSelector() {
  // FIX: nama "ticket" (tunggal) karena isinya satu object, bukan array tiket
  const [ticket, dispatch] = useReducer(ticketReducer, initialState);

  // Handler cuma "melaporkan" apa yang terjadi, tanpa logic bisnis
  function handleIncrement() {
    dispatch({ type: "increment" });
  }

  function handleDecrement() {
    dispatch({ type: "decrement" });
  }

  function handleReset() {
    dispatch({ type: "reset" });
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            Live Music Experience {/* FIX: typo "Exprerience" */}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-white">
            Penjualan Tiket Konser
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Amankan tiket konser favoritmu
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-5">
          <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-300">
            Concert Ticket
          </span>

          <h3 className="mt-4 text-2xl font-bold text-white">{ticket.nama}</h3>
          <p className="mt-2 text-sm text-slate-400">Harga tiket per orang</p> {/* FIX: typo "tiker" */}
          <p className="mt-1 text-2xl font-bold text-purple-400">
            Rp {ticket.harga.toLocaleString("id-ID")}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-5">
            <div>
              <p className="font-semibold text-white">Jumlah Tiket</p>
              <p className="mt-1 text-xs text-slate-400">
                Min {MIN_TICKET}, maks {MAX_TICKET} tiket
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleDecrement}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-700 text-xl font-bold text-white transition hover:border-purple-500 hover:bg-purple-600 active:scale-95"
              >
                -
              </button>
              <span className="min-w-5 text-center text-xl font-bold text-white">
                {ticket.jumlah}
              </span>
              <button
                onClick={handleIncrement}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-xl font-bold text-white transition hover:bg-purple-500 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-4 w-full rounded-lg border border-slate-600 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
          >
            Reset
          </button>
        </div>

        <div className="mt-5 rounded-xl bg-purple-600 p-5">
          <p className="text-sm font-medium text-purple-100">Total Pembayaran</p>
          <p className="mt-2 text-3xl font-extrabold text-white">
            Rp {(ticket.jumlah * ticket.harga).toLocaleString("id-ID")}
          </p>
          <p className="mt-2 text-xs text-purple-200">
            {ticket.jumlah} tiket × Rp {ticket.harga.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <TicketSelector />;
}

/*
  ===========================================================================
  JAWABAN PEMAHAMAN
  ===========================================================================

  1. Kenapa reducer harus pure dan tidak boleh memutasi state / punya side effect?
     React bisa memanggil reducer lebih dari sekali dengan input yang sama
     (misalnya saat re-render atau di Strict Mode) dan mengharapkan hasil yang
     sama. Kalau reducer punya side effect (console.log, ubah variable luar)
     atau memutasi state langsung, hasilnya jadi tidak bisa diprediksi, dan
     React tidak bisa mendeteksi perubahan dengan benar karena reference
     object-nya sama (masalah yang sama seperti mutasi langsung di Day 5).

  2. Keuntungan aturan "min 1, maks 5" ditaruh di reducer?
     Aturan bisnis ada di SATU tempat. Kalau nanti ada tombol baru yang juga
     mengubah jumlah (misal "beli 3 sekaligus"), aturan batas otomatis berlaku
     tanpa ditulis ulang. Kalau tersebar di tiap handler, satu handler yang
     lupa pasang batas bisa menghasilkan 6 tiket atau 0 tiket.
*/