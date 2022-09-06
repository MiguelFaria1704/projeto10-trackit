import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import UserContext from "../contexts/UserContext";
import { useEffect, useContext, useState } from "react";

export default function Menu() {
    const path = useLocation().pathname; 
    const { user } = useContext(UserContext);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(user.progress);
    }, user.progress);

    return (
        <>
            {(path !== "/" && path !== "/cadastro") && (
                <Bar>
                    <Link to="/habitos" style={{ textDecoration: 'none' }}>Hábitos</Link>

                   <Container><Progress progress={progress}/></Container>

                    <Link to="/historico" style={{ textDecoration: 'none' }}>Histórico</Link>
                    
                </Bar>
            )} 
        </>
    );
}
function Progress({ progress }) {
    return (
        <>
            <CircularProgressbar
                value={progress}
                background
                backgroundPadding={6}
                styles={buildStyles({
                backgroundColor: "#52B6FF",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
                width: "91"
                })}
            />
            
            <Link to="/hoje" style={{ textDecoration: 'none' }}>Hoje</Link>
        </>
    );
}

const Bar = styled.div`
    width: 100%;
    max-width: 800px;
    min-width: 350px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;

    a {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        color: #52B6FF;
    }
`;

const Container = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    a {
        position: absolute;
        text-align: center;
        left: calc(50% - 20px);
        top: calc(50% - 11px);
        color: white;
    }
`;
