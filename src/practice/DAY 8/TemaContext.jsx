import { createContext, useState } from "react";


export const TemaContext = createContext("")


function TemaProvider({children}){
    const [isLight, setIsLight] = useState(true)
    return (
            <TemaContext.Provider value={[isLight, setIsLight]}>
                {children}
            </TemaContext.Provider>
    )
}

export default TemaProvider