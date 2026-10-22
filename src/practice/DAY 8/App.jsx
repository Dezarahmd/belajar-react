import { useContext } from "react";
import DaftarProduk from "./DaftarProduk";
import Footer from "./Footer";
import Header from "./Header";
import TemaProvider, { TemaContext } from "./TemaContext";

function KontenApp() {
    const [isLight] = useContext(TemaContext);

    return (
        <div
            className={`min-h-screen ${
                isLight
                    ? "bg-white text-gray-900"
                    : "bg-gray-900 text-white"
            }`}
        >
            <Header />
            <DaftarProduk />
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <TemaProvider>
            <KontenApp />
        </TemaProvider>
    );
}
