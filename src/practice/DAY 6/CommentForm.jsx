import { useState } from "react";

export default function CommentForm(){
    const [text, setText] = useState("");

    function handleChange(e){
        setText(e.target.value);
    }

    return (
        <div>
            <textarea name="" id="" value={text} onChange={handleChange} placeholder="Tuliskan Komentar"></textarea>
        </div>
    )
}

// Prinsip Rekonsiliasi React Berdasarkan Posisi (Tree Structure):
// React menentukan apakah suatu komponen harus dipertahankan (preserve) atau dihancurkan (unmount) berdasarkan posisi komponen tersebut di dalam pohon render (render tree), bukan berdasarkan perubahan properti (props), gaya (styling), atau kelas CSS di sekitarnya.

// Struktur JSX yang Konsisten:
// Di dalam komponen App, struktur JSX-nya tetap sama: elemen pembungkus diubah kelasnya/gayanya, tombol ditekan untuk mengubah state isDarkMode, tetapi komponen <CommentForm/> tetap berada di urutan/posisi yang sama di bawah elemen induknya.

// Memori State Tetap Aman:
// Karena posisi <CommentForm/> di dalam render tree tidak bergeser atau digantikan oleh komponen jenis lain saat isDarkMode berubah, React menganggap itu adalah instans komponen yang sama persis. Akibatnya, React tidak menghancurkan (unmount) komponen tersebut, sehingga state lokal comment yang ada di dalamnya tetap terjaga dengan aman di dalam memori React. State input tidak akan ter-reset kecuali komponen tersebut benar-benar dicopot dari pohon render (misalnya dibungkus dengan kondisi isDarkMode && <CommentForm/> yang membuat posisinya hilang-timbul).