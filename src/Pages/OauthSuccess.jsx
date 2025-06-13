import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getOauthUser } from "../Utils/auth";
import { useUser } from "../Context/userContext";
import toast from "react-hot-toast";

export default function OAuthSuccess() {
  const {setUser, user} = useUser()

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      getOauthUser(setUser,toast,token)
    }
  }, []);

  if(user){
    return <Navigate to="/mainPage" />
  }

  return <p>Logging you in...</p>;
}