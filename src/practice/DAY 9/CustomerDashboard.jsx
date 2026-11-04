import { useEffect, useState } from "react"

export default function CustomerDashboard() {
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true)
                const response = await fetch("https://jsonplaceholder.typicode.com/users")
                if (!response.ok) {
                    throw new Error(`Gagal mengambil data (Status: ${response.status})`)
                }
                const data = await response.json()
                setCustomers(data)
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        getData()
    }, [])

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getInitials = (name) =>
        name
            .split(" ")
            .filter((word) => /^[A-Za-z]/.test(word) && !word.endsWith("."))
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("")

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Pencarian Pelanggan
                    </h1>
                    {!isLoading && !errorMessage && (
                        <p className="mt-1 text-sm text-slate-500">
                            Menampilkan {filteredCustomers.length} dari {customers.length} pelanggan
                        </p>
                    )}
                </header>

                {/* Search */}
                <div className="relative mb-6">
                    <svg
                        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Cari pelanggan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white py-16 text-slate-500">
                        <svg className="h-5 w-5 animate-spin text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        <p className="text-sm">Memuat data pelanggan...</p>
                    </div>
                ) : errorMessage ? (
                    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <p className="font-semibold">Data tidak bisa dimuat</p>
                        <p className="mt-1">{errorMessage}</p>
                    </div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white py-16 text-center">
                        <p className="font-medium text-slate-700">Pelanggan tidak ditemukan</p>
                        <p className="mt-1 text-sm text-slate-500">
                            Coba kata kunci lain untuk "{searchQuery}".
                        </p>
                    </div>
                ) : (
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {filteredCustomers.map((customer) => (
                            <li
                                key={customer.id}
                                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                                    {getInitials(customer.name)}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="truncate font-semibold text-slate-900">
                                        {customer.name}
                                    </h2>
                                    <p className="truncate text-sm text-slate-500">
                                        {customer.email}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}