import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./Top";
import Menu from "./Menu";
import Login from "./Login";
import SignUp from "./SignUp";
import Today from "./Today";
import Habits from "./Habits";
import History from "./History";
import UserContext from "../contexts/UserContext";
import "../assets/styles/reset.css";
import "../assets/styles/style.css";
import { useState } from "react";

export default function App() {
    const[user, setUser] = useState({});
        
    return (
        <BrowserRouter>
            <UserContext.Provider value={{user, setUser}}>
                <Top />
                <Menu />
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/cadastro" element={<SignUp/>} />
                    <Route path="/hoje" element={<Today/>} />
                    <Route path="/habitos" element={<Habits/>} />
                    <Route path="/historico" element={<History/>} />
                </Routes>
            </UserContext.Provider>    
        </BrowserRouter>
    );

}