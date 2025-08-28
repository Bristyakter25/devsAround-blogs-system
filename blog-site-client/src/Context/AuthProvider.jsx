import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import auth from "../firebase/firebas.init";




const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email,password) =>{
        setLoading(true);
     return createUserWithEmailAndPassword(auth,email,password);
    }

    const signInUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            console.log('state captured',currentUser);
            setLoading(false);
        })
        return()=>{
            unsubscribe();
        }

    },[])
    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value = {authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;