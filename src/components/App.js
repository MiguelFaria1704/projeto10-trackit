import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import { useState, useEffect } from "react";

export default function App() {
    return (
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    );
}

function Root() {
    const[user, setUser] = useState({});
    const navigate = useNavigate();

        

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("trackit"));
        
        if(local !== null) {    
            setUser(local);
        } else {
            navigate("/");
        }   
    }, []);  

    return (  
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
    );

}