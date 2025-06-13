import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import MainPage from "./Pages/MainPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import OAuthSuccess from "./Pages/OauthSuccess";
import { Analytics } from "@vercel/analytics/next"

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<LandingPage/>}/>
                <Route path="/login" element= {<Login/>}/>
                <Route path="/register" element= {<Register/>}/>
                <Route path="/mainPage" element= {<MainPage/>}/>
                <Route path="/oauth-success" element={<OAuthSuccess/>}/>
            </Routes>
            
            <Analytics/>
        </BrowserRouter>
    )
}