import { useEffect, useState } from "react"


//there are 2 parameters
//1. all data will be searched
//2. keyword field needed to search
//example: looking for people aged '25', based on field 'age' in array listUser
//return search results
export function useSearch( store: any[], field: string): any {
    const [search, setSearch] = useState('');
    const [ returnData, setReturnData ] = useState(store)

    const data = [...store]
    
    // keyword search
    const keyword: string = removeSymbol(search);

    useEffect(() => {
        if(search.length) {
            const newList = store.filter(item => {
                const removeSymbolItem = removeSymbol(item[field])
                return removeSymbolItem.toLowerCase().includes(keyword.toLowerCase())
            })
    
            setReturnData(newList);
        }
        else {
            setReturnData(data);
        }
    
    }, [keyword])

    return[
        returnData,
        setSearch
    ]
}

 //function remove special characters in string 
 function removeSymbol(str: string) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
}