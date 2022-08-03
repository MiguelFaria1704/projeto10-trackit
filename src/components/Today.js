import TokenContext from "../contexts/TokenContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

export default function Today() {
    const { token } = useContext(TokenContext);
    

    return (
        <><h1>Today!</h1></>
    );
}