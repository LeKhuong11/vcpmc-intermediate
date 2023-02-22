// import { useEffect, useState, useRef } from 'react'


// const useMounted = () => {
//     const isMounted = useRef(false);
//     useEffect(() => {
//       isMounted.current = true;
//       return () => (isMounted.current = false);
//     }, []);
//     return isMounted;
//   };


// const useSnapshot = (query) => {
//     const [data, updateData] = useState(undefined);
//     const [loading, setLoading] = useState(true);
//     const mounted = useMounted();
  
//     useEffect(() => {
//       const snapshot = query.onSnapshot((snapshot) => {
//         // create data array to feed to state
//         let data = [];
//         snapshot.forEach((doc) => {
//           data.push(doc);
//         });
//         // set states
//         if (mounted.current) updateData(data);
//         if (setLoading && mounted.current) setLoading(false);
//       });
//       return () => snapshot();
//     }, []);
  
//     return { data, loading };
//   };
  
//   export default useSnapshot;

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