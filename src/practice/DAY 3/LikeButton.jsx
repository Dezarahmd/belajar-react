function LikeButton({postTitle}){
    function handleLikeClick(){
        console.log(`Anda menyukai ${postTitle}`)
    }
    
    return (
        <div className="flex justify-center items-center min-h-screen gap-4">
            <button onClick={handleLikeClick} className="bg-red-500 rounded-md py-2 px-4 text-white font-semibold">Like</button>
            <button onClick={() => console.log(`membagikan: ${postTitle}`)} className="bg-blue-500 rounded-md py-2 px-4 text-white font-semibold">Share</button>
        </div>
    )
}

export default function App(){
    return (
        <LikeButton postTitle="Yuhuu"/>
    )
}