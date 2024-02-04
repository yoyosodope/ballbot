import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc } from "firebase/firestore";
import app from "@/app/_firebase/Config"
import { useEffect, useState } from "react";
import { Set } from "../_settings/interfaces";

function useGetSets() {
    const db = getFirestore(app);
    const [Sets, setSets] = useState<{ desc: string, price: number }[]>([])
    const [updated, setUpdated] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [newProduct, setNewProduct] = useState<Set[]>([]);

    useEffect(() => {
        async function fetchData() {
        //let data: { desc: string, price: number }[] = [];
        let data: Set[] = [];
            const querySnapshot = await getDocs(query(collection(db, "set"), orderBy("price")));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, desc: doc.data().desc, price: doc.data().price })
            console.log(`${doc.id} => ${doc.data()}`);
        });
        setSets(() => [...data]);
        setIsLoading(false);
        }
        fetchData();
    }, [db, updated]);

    async function addSet(set: { desc: string, price: number }) {
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "set"),
            { desc: set.desc, price: set.price });
        console.log("Document written with ID: ", docRef.id);
        setUpdated((currentValue) => currentValue + 1)
    }

    async function deleteSet(id: string) {
        try {
          const db = getFirestore(app);
          await deleteDoc(doc(db, "set", id));
          setUpdated((currentValue) => currentValue + 1)
        }
        catch (error) {
          console.error(error);
        }
    
      }

      //async function updateSet(set: { id: string, desc: string, price: number }) {
      async function updateSet(set: Set) {  
        try {
          const db = getFirestore(app);
          await updateDoc(doc(db, "set", set.id),
            { desc: set.desc, price: set.price });
          setUpdated((currentValue) => currentValue + 1)
        }
        catch (error) {
          console.error(error);
        }
    
      }
    return [Sets, addSet, deleteSet, updateSet, isLoading] as const;

}
export default useGetSets;