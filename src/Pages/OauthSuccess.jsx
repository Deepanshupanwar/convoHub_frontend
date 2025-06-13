import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getOauthUser } from "../Utils/auth";
import { useUser } from "../Context/userContext";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

export default function OAuthSuccess() {
  const { setUser, user } = useUser();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      getOauthUser(setUser, toast, token);
    }
  }, []);

  if (user) {
    return <Navigate to="/mainPage" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1b3a4b] text-white font-[Poppins]">
      <CircularProgress sx={{ color: "white", mb: 2 }} />
      <p className="text-lg mt-2 animate-pulse">Logging you in...</p>
    </div>
  );
}
