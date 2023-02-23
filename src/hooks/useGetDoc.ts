import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/configfb";

interface IGetDoc {
    id: any,
    name: any
}


export async function getDocFBase({id, name}: IGetDoc) {
    const docRef = doc(db, name, id);
    try {
        //get a document follow uid
        const data = await getDoc(docRef)            
        
        return data.data();
    } catch(err) {
        return false
    }
}