import Page from "../assets/styles/Page";
import styled from "styled-components";
import HabitCreator from "./HabitCreator";
import CheckBox from "../assets/styles/CheckBox";
import Header from "../assets/styles/Header";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { getHabits } from "../services/trackIt";
import { deleteHabit } from "../services/trackIt";


export default function Habits() {
    const { user } = useContext(UserContext);
    const [create, setCreate] = useState(false);
    const [habitsList, setHabitsList] = useState([]);

    function loadHabits() {
        getHabits(user.token).then((answer) => {
            setHabitsList(answer.data);
        });
    }
    
    useEffect(loadHabits, []);

    return (
        <Page>
            <Header location="/habitos">
                <h1>Meus hábitos</h1>
                <button onClick={() => setCreate(!create)}>+</button>
            </Header>

            {create === true &&(
                <HabitCreator setCreate={setCreate} user={user} loadHabits={loadHabits} />
            )}

            {habitsList.length > 0 ? (
                <HabitsList habitsList={habitsList} loadHabits={loadHabits}/>
            ) : (
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            )} 
            
            
        </Page>
    );
}

function HabitsList({ habitsList, loadHabits }) {
    return (
        <>
            {habitsList.map(habit => (
                <Habit key={habit.id} habit={habit} loadHabits={loadHabits} />
            ))}
        </>
    );
}

function Day({ days, day }) {
    let checked;

    days.filter(element => element === day).length !== 0 ?
        checked = true :
        checked = false;

    return (
        <CheckBox
            disabled
            checked={checked}
        >
                {day === 1 && "S"}
                {day === 2 && "T"}
                {day === 3 && "Q"}
                {day === 4 && "Q"}
                {day === 5 && "S"}
                {day === 6 && "S"}
                {day === 7 && "D"}
        </CheckBox>
    );
}

function Habit({ 
    habit,
    loadHabits 
}) {
    const { user } = useContext(UserContext);
        
    function deleteThis() {
        const confirmation = window.confirm("Tem certeza de que quer deletar este hábito? Esta ação não poderá ser desfeita.");
        
        if(confirmation) {
             deleteHabit(habit.id, user.token).then(() => {
                loadHabits();
            });    
        }
    }

    return (
        <HabitStyle>
            <p>{habit.name}</p>

            <span>
                <Day days={habit.days} day={7} />
                <Day days={habit.days} day={1} />
                <Day days={habit.days} day={2} />
                <Day days={habit.days} day={3} />
                <Day days={habit.days} day={4} />
                <Day days={habit.days} day={5} />
                <Day days={habit.days} day={6} />
            </span>

            <ion-icon
                name="trash-bin-outline"
                onClick={deleteThis}
            />
        </HabitStyle>
    );  
}

const HabitStyle = styled.div`
    width: 100%;
    min-height: 91px;
    padding: 15px 13px;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    p{
        margin: 0;
        font-size: 20px;
        line-height: 25px;
    }

    ion-icon {
        font-size: 15px;
        position: absolute;
        top: 10px;
        right: 10px;
        color: #666666;
    }
`;


