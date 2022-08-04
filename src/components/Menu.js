import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import {CircularProgressbar,buildStyles} from "react-circular-progressbar";

export default function Menu() {
    const path = useLocation().pathname;

    return (
        <>
            {(path !== "/" && path !== "/cadastro") && (
                <Bar>
                    <Link to="/habitos" style={{ textDecoration: 'none' }}>Hábitos</Link>

                   <Container><Progress /></Container>

                    <Link to="/" style={{ textDecoration: 'none' }}>Histórico</Link>
                    
                </Bar>
            )} 
        </>
    );
}
function Progress() {
    return (
        <>
            <CircularProgressbar
                value={30}
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