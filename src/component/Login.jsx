import { use, useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../utils/Store/appStore";


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const email = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null); // Reset errors on toggle
    };

    const handleButtonClick = async (e) => {
        e.preventDefault(); // <-- prevent form submit

        const emailVal = email.current?.value;
        const passVal = password.current?.value;

        const validationMessage = checkValidateData(emailVal, passVal);
        if (validationMessage !== null) {
            setErrorMessage(validationMessage);
            return;
        }

        try {
            if (isSignInForm) {
                // 🔐 Sign In
                const userCredential = await signInWithEmailAndPassword(auth, emailVal, passVal);
                console.log("Signed in:", userCredential.user)
                console.log(userCredential.user);
                
                dispatch(login({ uid: userCredential.user.uid, email: userCredential.user.email }));
                navigate("/browse")
            } else {
                // 📝 Sign Up
                const userCredential = await createUserWithEmailAndPassword(auth, emailVal, passVal);
                console.log("Signed up:", userCredential.user);
                // ✅ Reset form after successful sign-up
                email.current.value = "";
                password.current.value = "";
                setErrorMessage(null);
            }
        } catch (error) {
            console.error("Firebase Auth Error:", error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="relative min-h-screen">
            <Header />

            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <form

                
                className="flex justify-center items-center h-screen"
            >
                <div
                    className="flex flex-col justify-center w-80 p-6 rounded-md h-[450px]"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)' }}
                >
                    <h1 className="text-amber-50 font-bold text-2xl py-7">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {!isSignInForm && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="mb-4 p-3 w-full rounded text-white text-center bg-transparent border border-white"
                        />
                    )}

                    <input
                        type="text"
                        ref={email}
                        placeholder="Email Address"
                        className="mb-4 p-3 w-full rounded text-white text-center bg-transparent border border-white"
                    />

                    <input
                        type="password"
                        ref={password}
                        placeholder="Password"
                        className="mb-4 p-3 w-full rounded text-white text-center bg-transparent border border-white"
                    />

                    {errorMessage && (
                        <p className="text-red-500 text-center mb-3">{errorMessage}</p>
                    )}

                    <button
                        onClick={handleButtonClick}
                        className="mb-2 bg-red-600 text-white w-full p-3 rounded"
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <p className="p-2 text-amber-50 cursor-pointer" onClick={toggleSignInForm}>
                        {isSignInForm
                            ? "Don't have an account? Sign Up"
                            : "Already have an account? Sign In"}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
