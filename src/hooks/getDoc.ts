import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/configfb";

interface IGetDoc {
    id: any,
    name: any
}


export async function getDocFireBase({id, name}: IGetDoc) {
    const docRef = doc(db, name, id);
    try {
        //get a document by uid
        const data = await getDoc(docRef)            
        
        return data.data();
    } catch(err) {
        return false
    }
}