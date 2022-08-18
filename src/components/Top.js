import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useLocation } from "react-router-dom";

export default function Top() {
    const { user } = useContext(UserContext);
    const path = useLocation().pathname;

    return (
        <>
            {(path !== "/" && path !== "/cadastro") && (
                <Bar>
                    <h1>TrackIt</h1>
                    <img src={user.image} alt="Profile" />
                </Bar>
            )} 
        </>       
    );
}

const Bar = styled.div`
    max-width: 800px;
    width: auto;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;

    h1 {
        font-family: 'Playball', cursive;
        font-size: 40px;
        color: white;
        line-height: 48px;
    }
    
    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
        object-fit: cover;
    }
`;
