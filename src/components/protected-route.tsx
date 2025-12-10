import { Navigate } from "react-router-dom";
import { auth } from "../FirebaseSetup"

function ProtectedRoute({children}: {children: React.ReactNode}){
    const user = auth.currentUser;

    if(user === null){
        return children;
    } else {
        return <Navigate to={"/home"} />
    }
};

export default ProtectedRoute