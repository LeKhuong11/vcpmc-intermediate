import { useState } from "react"
import { removeSymbol } from "../function/removeSpecialKeyWord";


export function useSearch( store: any[], title: string): any {
    const [search, setSearch] = useState('');
    const [ returnData, setReturnData ] = useState(store)

    const data = [...store]

    
    // keyword search
    const keyword: string = search;

    const newList = store.filter(item => {
        return item[title].includes(keyword)
    })

    console.log(newList);
    
    return[
        search,
        setSearch
    ]
}