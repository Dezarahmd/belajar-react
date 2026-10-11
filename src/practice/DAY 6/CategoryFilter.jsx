export default function CategoryFilter({selectedCategory, onCategoryChange}){
    return (
        <div>
            <button onClick={() => onCategoryChange("semua")}>Semua</button>
            <button onClick={() => onCategoryChange("Elektronik")}>Elektronik</button>
            <button onClick={() => onCategoryChange("Pakaian")}>Pakaian</button>
        </div>
    )
}