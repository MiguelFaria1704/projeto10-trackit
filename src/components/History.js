import Page from "../assets/styles/Page";
import Header from "../assets/styles/Header";
import MyCalendar from "./MyCalendar";
import { getHabitsHistory } from "../services/trackIt";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";


export default function History() {
    const [events, setEvents] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getHabitsHistory(user.token).then(answer => {
            setEvents(answer.data);
        })
    }, []);
    
    return (
        <Page>
            <Header location="/historico">
                <h1>Histórico</h1>
            </Header>

            <MyCalendar events={events}/>
        </Page>
    );
}