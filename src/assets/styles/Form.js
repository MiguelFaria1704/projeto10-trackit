import styled from "styled-components";

const Form = styled.form`
    margin: 32px 0 25px 0;
    width: 100%;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input, div {
        width: 100%;
        height: 45px;
        border-radius: 5px;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="url"] {
        border: 1px solid #D5D5D5;
        margin-bottom: 6px;
        padding: 0 11px;
        outline: none;
    }

    input[type="submit"], div {
        border: none;
        background-color: #52B6FF;
        color: #FFFFFF;
        font-size: 21px;
    }

    &&input:disabled {
        color: red;
    }

    input:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: red !important;
    color: fieldtext !important;
}

    input::placeholder
     {
        font-size: 20px;
        color: #DBDBDB !important;
    }

    p {
        font-size: 14px;
        color: #52B6FF;
        text-align: center;
        text-decoration: underline;
        margin-top: 25px;
    }
`;

export default Form;