import UserContext from "../contexts/UserContext";
import Page from "../assets/styles/Page"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

export default function Today() {
    const { user } = useContext(UserContext);
    console.log(user);

    return (
        <Page><h1>Today!</h1></Page>
    );
}