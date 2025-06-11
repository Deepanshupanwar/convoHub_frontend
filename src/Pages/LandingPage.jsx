import ChatIcon from "@mui/icons-material/Chat";
import chatImg from "../Utils/chatImg.jpg";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { getUser } from "../Utils/auth";
import { useEffect } from "react";
import { useUser } from "../Context/userContext"
import { Navigate, Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function LandingPage() {
  const { user, setUser } = useUser();

  useEffect(() => {
    getUser(setUser,toast)
  }, [])

 
  if (user) {
    return <Navigate to="/mainPage" />
  }

  return (
    <div className="min-h-screen  flex flex-col scroll-smooth">
      <Toaster/>
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <ChatIcon className="text-white" />
          <span className="text-2xl font-bold text-white">ConvoHub</span>
        </div>
        <nav className="space-x-6">
          <a href="#home" className="text-white hover:text-gray-200">Home</a>
          <a href="#features" className="text-white hover:text-gray-200">Features</a>
          <a href="#about" className="text-white hover:text-gray-200">About</a>
          <Link to={"/register"} className="bg-sky-500 px-4 py-2 text-white rounded-lg hover:bg-sky-600 transition-colors duration-300">Sign up</Link>
        </nav>
      </header>

      <section id="home" className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 md:px-20 py-10">
        <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Connect. Chat. Grow.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Real-time conversations, meaningful connections — all in one place.
            Experience the future of communication with <b>ConvoHub</b>.
          </p>
          <div className="mt-8">
            <Link to={"/register"} className="bg-sky-500 px-6 py-3 text-white text-xl rounded-lg hover:bg-sky-600 transition-colors duration-300">Join Now</Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={chatImg}
            alt="Chat Illustration"
            className="rounded-3xl shadow-2xl w-80 md:w-[28rem]"
          />
        </div>
      </section>
      <section id="features" className="bg-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Features that Make ConvoHub Unique
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Real-Time Messaging</h3>
            <p className="text-gray-600">
              Instant communication with zero delays. Connect with your friends
              anytime, anywhere.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Group Chats</h3>
            <p className="text-gray-600">
              Create groups, share moments, and collaborate with multiple users
              easily.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Media Sharing</h3>
            <p className="text-gray-600">
              Share images, videos, and audio files securely with your
              connections.
            </p>
          </div>
        </div>
      </section>
      <section id="about" className="py-16 px-6 md:px-20  text-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-5xl mb-4"><AssignmentIcon sx={{ width: 60, height: 60 }} /></div>
            <h3 className="text-2xl font-semibold mb-2">1. Sign Up</h3>
            <p>Create your account and set up your profile in just a few steps.</p>
          </div>
          <div>
            <div className="text-5xl mb-4"><Diversity3Icon sx={{ width: 60, height: 60 }} /></div>
            <h3 className="text-2xl font-semibold mb-2">2. Connect</h3>
            <p>Send connection requests and build your network.</p>
          </div>
          <div>
            <div className="text-5xl mb-4"><ChatIcon sx={{ width: 60, height: 60 }} /></div>
            <h3 className="text-2xl font-semibold mb-2">3. Start Chatting</h3>
            <p>Jump into real-time conversations with individuals or groups.</p>
          </div>
        </div>
      </section>
      <section className="bg-white py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
          Ready to start your conversations?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join ConvoHub today and connect like never before!
        </p>
        <Link to={"/register"} className="bg-blue-800 px-6 py-3 text-white text-2xl rounded-lg hover:bg-blue-900 transition-colors duration-300">Join Now</Link>
      </section>
      <footer className="p-6 text-center text-gray-300 ">
        © 2025 ConvoHub. All rights reserved.
      </footer>
    </div>
  );
}
