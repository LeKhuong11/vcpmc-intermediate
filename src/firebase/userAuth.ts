import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./configfb"

export function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword( auth, email, password)
}

export function logIn(email: string, password: string) {
    return signInWithEmailAndPassword( auth, email, password)
}

export function logOut() {
    return signOut(auth)
}