import ChatIcon from "@mui/icons-material/Chat";
import chatImg from "../Utils/chatImg.jpg";
import { Link, Navigate } from "react-router-dom"
import { useRef } from "react";
import { useUser } from "../Context/userContext"
import { RegisterHandler, googleLoginHandler, getUser } from "../Utils/auth";
import toast, {Toaster} from "react-hot-toast";

export default function Register() {
    const { user, setUser } = useUser();
    const confirmpasswordRef = useRef();
    const usernameRef = useRef();
    const useremailRef = useRef();
    const passwordRef = useRef();


    if (user) {
        return <Navigate to="/mainPage" />
    }


    return (
        <div className="min-h-screen bg-[#133c55] flex items-center justify-center font-[Poppins] px-4">
            <Toaster/>
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">

                <div className="flex-1 p-8 flex flex-col justify-center space-y-6">

                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <ChatIcon className="w-8 h-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-800">ConvoHub</h1>
                    </div>


                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref={usernameRef}
                        />
                        <input
                            type="text"
                            placeholder="JohnDoe@gmail.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref={useremailRef}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref={passwordRef}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref={confirmpasswordRef}
                        />
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            onClick={(e) => {
                                RegisterHandler(setUser, confirmpasswordRef, passwordRef, useremailRef, usernameRef,toast)
                                setError('');
                            }}
                        >
                            Sign Up
                        </button>
                    </div>


                    <div className="space-y-2 text-center">
                        <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-[#EA4335] hover:text-white transition"
                            onClick={googleLoginHandler}
                        >
                            Sign in with Google
                        </button>
                        <p className="text-sm text-gray-600">
                            Already have an account? <Link to={"/login"} className="text-blue-600 hover:underline cursor-pointer">Login</Link>
                        </p>
                    </div>
                </div>


                <div className="hidden md:block md:w-1/2">
                    <img
                        src={chatImg}
                        alt="Chat Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    )
}