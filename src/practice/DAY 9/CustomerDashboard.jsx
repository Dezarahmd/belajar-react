import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import ProductCard from './ProductCard'

export default function InventoryDashboard() {
    // --- 1. STATE MANAGEMENT ---
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [seconds, setSeconds] = useState(0)
    const [isTimerActive, setIsTimerActive] = useState(false)

    // --- 2. REF MANAGEMENT ---
    const requestIdRef = useRef(0)
    const timerIdRef = useRef(null)
    const searchInputRef = useRef(null)

    // --- 3. FETCH DATA & RACE CONDITION HANDLING ---
    const fetchInventory = useCallback(async () => {
        requestIdRef.current += 1
        const currentRequestId = requestIdRef.current

        setIsLoading(true)
        setErrorMessage("")

        try {
            const res = await fetch("https://dummyjson.com/products")
            if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`)
            
            const data = await res.json()

            // PERBAIKAN 1: DummyJSON mengembalikan { products: [...] }
            // Mapping agar sesuai dengan prop yang dibutuhkan ProductCard (name = title)
            const formattedProducts = (data.products || []).map((item) => ({
                id: item.id,
                name: item.title,      // DummyJSON menggunakan `title`
                category: item.category,
                stock: item.stock
            }))

            if (currentRequestId === requestIdRef.current) {
                setProducts(formattedProducts)
            }
        } catch (error) {
            if (currentRequestId === requestIdRef.current) {
                setErrorMessage(error.message || "Gagal mengambil data inventaris.")
            }
        } finally {
            if (currentRequestId === requestIdRef.current) {
                setIsLoading(false)
            }
        }
    }, [])

    // --- 4. EFFECTS ---
    useEffect(() => {
        fetchInventory()
    }, [fetchInventory])

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [])

    useEffect(() => {
        if (isTimerActive) {
            timerIdRef.current = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1)
            }, 1000)
        }

        return () => {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current)
                timerIdRef.current = null
            }
        }
    }, [isTimerActive])

    // --- 5. HANDLERS ---
    const handleStartTimer = useCallback(() => setIsTimerActive(true), [])
    const handlePauseTimer = useCallback(() => setIsTimerActive(false), [])
    const handleResetTimer = useCallback(() => {
        setIsTimerActive(false)
        setSeconds(0)
    }, [])

    const handleFocusSearch = useCallback(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [])

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value)
    }, [])

    // --- 6. MEMOIZATION (FILTERING PRODUK) ---
    // PERBAIKAN 2: Gunakan optional chaining (product.name?.toLowerCase()) agar aman dari undefined
    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            (product.name || "").toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [products, searchQuery])

    // --- 7. UI RENDER ---
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
            <div className="mx-auto max-w-4xl space-y-6">
                
                {/* Header & Pemantau Aktivitas */}
                <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Dashboard Inventaris
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Menampilkan {filteredProducts.length} dari {products.length} produk.
                        </p>
                    </div>

                    {/* Timer Widget */}
                    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                        <div className="border-r border-slate-200 pr-2 text-center">
                            <span className="block text-xs font-medium text-slate-500">Waktu Sesi</span>
                            <span className="font-mono text-xl font-bold text-indigo-600">
                                {String(Math.floor(seconds / 60)).padStart(2, '0')}:
                                {String(seconds % 60).padStart(2, '0')}
                            </span>
                        </div>
                        <div className="flex gap-1">
                            {!isTimerActive ? (
                                <button
                                    type="button"
                                    onClick={handleStartTimer}
                                    className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700"
                                >
                                    Mulai
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handlePauseTimer}
                                    className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-amber-600"
                                >
                                    Jeda
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleResetTimer}
                                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </header>

                {/* Toolbar Search & Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <svg
                            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                        </svg>
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Cari produk berdasarkan nama..."
                            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleFocusSearch}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                            <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 2m0 0l-2-2m2 2V8m0 9a9 9 0 110-18 9 9 0 010 18z" />
                            </svg>
                            Fokus Input
                        </button>
                        <button
                            type="button"
                            onClick={fetchInventory}
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <svg
                                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Muat Ulang Data
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <main>
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16 shadow-sm">
                            <svg className="h-8 w-8 animate-spin text-indigo-600" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            <p className="mt-3 text-sm font-medium text-slate-600">Memuat inventaris produk...</p>
                        </div>
                    ) : errorMessage ? (
                        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
                            <div className="flex items-start gap-3">
                                <svg className="h-5 w-5 text-red-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-red-900">Gagal Mengambil Data Inventaris</h3>
                                    <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
                                    <button
                                        type="button"
                                        onClick={fetchInventory}
                                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-red-800 underline underline-offset-2 hover:text-red-900"
                                    >
                                        Coba lagi
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
                            <p className="font-medium text-slate-800">Tidak ada produk ditemukan</p>
                            <p className="mt-1 text-sm text-slate-500">
                                {searchQuery ? `Hasil pencarian untuk "${searchQuery}" tidak tersedia.` : 'Inventaris saat ini kosong.'}
                            </p>
                        </div>
                    ) : (
                        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    category={product.category}
                                    stock={product.stock}
                                />
                            ))}
                        </ul>
                    )}
                </main>
            </div>
        </div>
    )
}