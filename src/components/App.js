import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Today from "./Today";
import TokenContext from "../contexts/TokenContext";
import "../assets/reset.css";
import "../assets/style.css";
import { useState } from "react";

export default function App() {
    const[token, setToken] = useState({});

    return (
        <BrowserRouter>
            <TokenContext.Provider value={{token, setToken}}>
                {/* <Top />
                <Menu /> */}
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/cadastro" element={<SignUp/>} />
                    <Route path="/hoje" element={<Today/>} />
                    {/* <Route path="/habitos" element={<Habits/>} />
                    <Route path="/historico" element={<History/>} /> */}
                </Routes>
            </TokenContext.Provider>    
        </BrowserRouter>
    );

}