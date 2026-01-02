import { Navigate } from "react-router-dom";
import { auth } from "../FirebaseSetup"
import { useEffect } from "react";

interface I_ProtectedRoute {
    children: React.ReactNode;
}

export function DefaultProtected({children}: I_ProtectedRoute){
    const user = auth.currentUser;

    useEffect(() => console.log(user), [])

    if(user === null){
        return children;
    } else {
        return <Navigate to={"/home"} />
    }
};

export function HomeProtected({children}: I_ProtectedRoute){
    const user = auth.currentUser;

    if(user === null){
        return <Navigate to={"/"} />
    } else {
        return children;
    }
}