import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import MainPage from "./Pages/MainPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<LandingPage/>}/>
                <Route path="/login" element= {<Login/>}/>
                <Route path="/register" element= {<Register/>}/>
                <Route path="/mainPage" element= {<MainPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}