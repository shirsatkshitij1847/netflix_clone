import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const email = useRef(null);
    const password = useRef(null);




    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonCLick = () => {

        const emailVal = email.current?.value;
        const passVal = password.current?.value;
        console.log(emailVal);
        console.log(passVal);
        const message = checkValidateData(emailVal, passVal);

        if (message === null) {
            if (!isSignInForm) {
                //signUp login
                createUserWithEmailAndPassword(auth, emailVal, passVal).then((userCredencial) => {
                    const user = userCredencial.user;
                    console.log(user);

                }).catch((error) => {
                    const errorCode = error.code;
                    const errmessage = error.message;
                });

            }
            if (isSignInForm) {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log(user);
                        
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });

            }
        }
    }
    return (
        <div className="relative min-h-screen">
            <Header />
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg" alt="baground Image"
                    className="w-full h-full object-cover" />


            </div>

            <form onSubmit={(e) => { e.preventDefault() }} className=" flex justify-center items-center h-screen">
                <div
                    className="flex flex-col justify-center w-80 p-6 rounded-md h-[450px]"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)' }}
                >
                    <h1 className="text-amber-50 font-bold text-2xl py-7">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                    {!isSignInForm &&
                        <input type="text" placeholder="Full Name" className="mb-8  p-3 w-full rounded text-white text-center bg-transparent border border-white"></input>}
                    <input
                        type="text"
                        ref={email}
                        placeholder="Email Address"
                        className="mb-8  p-3 w-full rounded text-white text-center bg-transparent border border-white"
                    />

                    <input
                        type="password"
                        ref={password}
                        placeholder="Password"
                        className="mb-11  p-3 w-full rounded text-white text-center bg-transparent border border-white"
                    />


                    <button onClick={handleButtonCLick} className=" mb-2  bg-red-600 text-white w-full p-3 rounded">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>
                    <p className="p-2 text-amber-50 "
                        onClick={toggleSignInForm}>don't have acount ? Sign Up</p>
                </div>
            </form>


        </div>
    )
}

export default Login;