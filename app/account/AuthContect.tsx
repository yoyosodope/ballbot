'use client'
import { getAuth, onAuthStateChanged,User } from "firebase/auth";
import { createContext, useEffect, useState} from "react";
import app from "@/app/_firebase/Config";

export const AuthContext = createContext('email');
export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const unsub = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
            setEmail(authUser.email ? authUser.email : "");
        }
        else {
            setEmail("");
        }

        console.log(authUser);
        return () => {
            unsub();
        }
    }
    );
    useEffect(unsub, [unsub]);

    return (
        <AuthContext.Provider value={email}>
            {children}
        </AuthContext.Provider>
    );
};