import styled from "styled-components";

const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-family: 'Lexend Deca', sans-serif;
    align-items: ${props => props.location === "/hoje" ? 'left' : 'center'};
    margin-bottom: 20px;
    flex-direction: ${props => props.location === "/hoje" ? 'column' : 'row'};

    h1 {
        font-size: 23px;
        color: #126BA5;
    }

    p {
        margin-top: 5px;
        color: ${props => props.done === 0 ? '#BABABA' : '#8FC549'};
    }

    button {
        width: 40px;
        height: 35px;
        color: white;
        background-color: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        font-size: 27px;
    }
`;

export default Header;