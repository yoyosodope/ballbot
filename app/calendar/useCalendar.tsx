import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import app from "@/app/_firebase/Config"
import { useEffect, useState } from "react";
import { Reminder } from "../_settings/interfaces";

export default function useProducts() {
    const db = getFirestore(app);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [updated, setUpdated] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            let data: Reminder[] = []
            const querySnapshot = await getDocs(collection(db, "reminder"));

            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, date: doc.data().date, event: doc.data().event })
                console.log(`${doc.id} => ${doc.data()}`);
            });
            setReminders(() => [...data]);
            setIsLoading(false);
        }
        fetchData();
    }, [db, updated]);

    async function addReminder(reminder: Reminder) {
        const docRef = await addDoc(collection(db, `reminder`),
            { date: reminder.date, event: reminder.event });
        console.log("Document written with ID: ", docRef.id);
        setUpdated((currentValue) => currentValue + 1)
    }

    async function deleteReminder(id: string) {
        try {
            const db = getFirestore(app);
            await deleteDoc(doc(db, `reminder`, id));
            setUpdated((currentValue) => currentValue + 1)
        }
        catch (error) {
            console.error(error);
        }
    }

    async function updateReminder(reminder: Reminder) {
        try {
            const db = getFirestore(app);
            await updateDoc(doc(db, `reminder`, reminder.id),
                { date: reminder.date, event: reminder.event });
            setUpdated((currentValue) => currentValue + 1)
        }
        catch (error) {
            console.error(error);
        }

    }

    return { reminders, addReminder, deleteReminder, updateReminder, isLoading } as const;

}
