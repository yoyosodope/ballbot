import { Timestamp } from "firebase/firestore";

export type Reminder = {
    id: string;
    date: Timestamp;
    event: string;
}