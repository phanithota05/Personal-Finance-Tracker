import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth,db } from "../../firebase";
import { doc, setDoc,getDoc,serverTimestamp } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const provider = new GoogleAuthProvider();
function SignUpSignincomponent(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword]= useState("");
    const [loginForm,setLoginForm] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    function signupWithEmail(){
        setLoading(true);
        console.log("Name",name);
        console.log("email",email);
        console.log("password",password);
        console.log("confirmpassword",confirmPassword);
        //Create new account using email and password
        if(name!="" && email!="" && password!= "" && confirmPassword!= ""){
        if(password==confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed up 
        const user = userCredential.user;
        console.log("User>>>",user);
        toast.success("User Created!");
        setLoading(false);
        setName("");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
        createDoc(user);
        navigate("/dashboard");
    // ...
        })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
  });
}else{
    toast.error("Password did not match");
    setLoading(false);
}
 } else{
    toast.error("All fields are mandatory!");
    setLoading(false);
 }
}
function loginUsingEmail(){
console.log("Email",email);
console.log("password",password);
setLoading(true);
if(email!="" && password!= ""){
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("User Logged In!");
    console.log("User logged in",user);
    setLoading(false);
    navigate("/dashboard");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    toast.error("User Logged In!");
  });
}else{
    toast.error("All fields are mandatory!");
    setLoading(false);
}
}
async function createDoc(user){
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
    try{
    await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName : name,
          email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: serverTimestamp(),
    });
    toast.success("Doc created!");
    setLoading(false);
}
catch(e){
    toast.error(e.message);
    setLoading(false);
}
}
else{
   // toast.error("Doc already exists");
    setLoading(false);
}
}
function googleAuth(){
setLoading(true);
try{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("user>>>",user);
      createDoc(user);
      setLoading(false);
      navigate("/dashboard");
      toast.success("User Authenticated");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
        setLoading(false);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    });
}catch(e){
    setLoading(false);
    toast.error(e.message);
}

}
    return (
    <>
    {loginForm?(
    <div className="signup-wrapper">
        <h2 className="title">
        Login on <span style={{color:"var(--theme)"}}>Finance app.</span>
        </h2>
        <form>
            <Input 
            type="email"
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"fcbarcelona@gmail.com"} 
            />
            <Input 
            type = "password"
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"MessiGoat"} 
            />
            <Button
            disabled={loading} 
            text={loading ? "Loading...":"Login Using Email and Password"} 
            onClick={loginUsingEmail}/>
            <p className="p-login">or</p>
            <Button
             onClick={googleAuth}
             text={loading?"Loading...":"Login Using Google"} blue={true}
            />
            <p className="p-login" style={{cursor:"pointer"}}
             onClick={()=>setLoginForm(!loginForm)}>
            Don't Have an account? Click Here</p>
        </form>
    </div>
):(
    <div className="signup-wrapper">
        <h2 className="title">
        Sign Up on <span style={{color:"var(--theme)"}}>Finance app.</span>
        </h2>
        <form>
            <Input 
            label={"Full Name"}
            state={name}
            setState={setName}
            placeholder={"Thota Phani"} 
            />
            <Input 
            type="email"
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"fcbarcelona@gmail.com"} 
            />
            <Input 
            type = "password"
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"MessiGoat"} 
            />
            <Input 
            type = "password"
            label={"Confirm Password"}
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder={"MessiGoat"} 
            />
            <Button
            disabled={loading} 
            text={loading ? "Loading...":"Signup Using Email and Password"} 
            onClick={signupWithEmail}/>
            <p className="p-login">or</p>
            <Button 
            onClick={googleAuth}
            text={loading?"Loading...":"Signup Using Google"} blue={true}
            />
            <p className="p-login" style={{cursor:"pointer"}}
             onClick={()=>setLoginForm(!loginForm)}>
                Have an account? Click Here
            </p>
        </form>
    </div>
    )}
    </>
    );
}

export default SignUpSignincomponent;