import { Navigate } from "react-router-dom";
import { auth } from "../FirebaseSetup"
import { useEffect } from "react";

function ProtectedRoute({children}: {children: React.ReactNode}){
    const user = auth.currentUser;

    if(user === null){
        return <Navigate to={"/"} />
    } else {
        return children
    }
};

export default ProtectedRoute