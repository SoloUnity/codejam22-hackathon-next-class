import React, { useEffect, useState, useContext } from 'react'
import { createContext } from 'react'   
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const userAuthContext = createContext();

export function UserAuthContextProvider({children}) {
        const [user, setUser] = useState("");

            function LogedIn(email, password) {
                return signInWithEmailAndPassword (auth, email, password)
            
            }

            function SignUp(email, password) {
                return createUserWithEmailAndPassword (auth, email, password)
            }

            useEffect(() => {
               const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
        
               });
               return () => {
                     unsubscribe();
                }
            }, []);
        
            return <userAuthContext.Provider value={{user, SignUp, LogedIn}}>{children}</userAuthContext.Provider>}


export function useUserAuth() {
    return useContext(userAuthContext);
}