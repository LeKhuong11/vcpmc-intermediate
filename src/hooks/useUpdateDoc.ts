import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/configfb"


interface IUpdate {
    documentName: string,
    id: any,
    data: any
}

export const updateDocConfig = async ({documentName, id, data}: IUpdate) => {
    const docRef = doc(db, documentName, `${id}`)

    try {
        await updateDoc(docRef, data);
        return true
    } catch(err) {

        return false
    }
}

