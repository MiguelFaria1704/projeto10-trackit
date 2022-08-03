import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import UserContext from "../contexts/UserContext";
import "../assets/reset.css";
import "../assets/style.css";
import { useState } from "react";

export default function App() {
    const[user, setUser] = useState({});

    return (
        <BrowserRouter>
            <UserContext.Provider value="{{user, setUser}}">
                {/* <Top />
                <Menu /> */}
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/cadastro" element={<SignUp/>} />
                    {/* <Route path="/habitos" element={<Habits/>} />
                    <Route path="/hoje" element={<Today/>} />
                    <Route path="/historico" element={<History/>} /> */}
                </Routes>
            </UserContext.Provider>    
        </BrowserRouter>
    );

}