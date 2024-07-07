import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "./user.svg";
function Header() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, loading, navigate]);

    async function logoutFnc() {
        try {
            await signOut(auth);
            toast.success("Logged out Successfully");
            navigate("/");
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <div className="navbar">
            <p className="logo">Finance</p>
            {user && (
                <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                <img src={user.photoURL?user.photoURL:userImg} style={{borderRadius:"50%",height:"1.5rem",width:"1.5rem"}}/>
                <p className="logo link" onClick={logoutFnc}>
                    Logout
                </p>
                </div>
            )}
        </div>
    );
}

export default Header;
