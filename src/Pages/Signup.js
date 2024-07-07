import React from "react";
import Header from "../components/Header";
import SignUpSignincomponent from "../components/SignupSignin";
function Signup(){
    return (
    <div>
        <Header />
        <div className="wrapper">
            <SignUpSignincomponent/>
        </div>
    </div>
    );
}
export default Signup;
