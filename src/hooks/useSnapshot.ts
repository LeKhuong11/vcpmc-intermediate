import { useEffect, useState } from "react";
import { db } from "../firebase/configfb";
import { collection, onSnapshot } from "firebase/firestore";

export const usePaymentsCollection = (nameDoc: string) => {
  const [payments, setPayments] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    setLoading(true)
    const colRef = collection(db, nameDoc)
    //real time update
    const unsub = onSnapshot(colRef, (snapshot: any) => {
        const items: any[] = []
        snapshot.docs.forEach((doc: any) => {
          items.push({...doc.data(), id: doc.id})
        })
        setPayments(items)
        setLoading(false)
    })
 
    return () => {
      unsub()
    };
}, [])

  return {
    payments,
    loading
  };
};