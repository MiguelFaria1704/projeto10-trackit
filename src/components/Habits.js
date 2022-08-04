import Page from "../assets/styles/Page";
import styled from "styled-components";
import HabitCreator from "./HabitCreator";
import CheckBox from "../assets/styles/CheckBox";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { getHabits } from "../services/tracklt";
import { deleteHabit } from "../services/tracklt";


export default function Habits() {
    const { user } = useContext(UserContext);
    const [create, setCreate] = useState(false);
    const [habitsList, setHabitsList] = useState([]);

    function reloadHabits() {
        getHabits(user.token).then((answer) => {
            setHabitsList(answer.data);
        });
    }
    
    useEffect(reloadHabits, []);

    return (
        <Page>
            <Header>
                <h1>Meus hábitos</h1>
                <button onClick={() => setCreate(!create)}>+</button>
            </Header>

            {create === true &&(
                <HabitCreator setCreate={setCreate} user={user} reloadHabits={reloadHabits} />
            )}

            {habitsList.length > 0 ? (
                <HabitsList habitsList={habitsList} reloadHabits={reloadHabits}/>
            ) : (
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            )}

        </Page>
    );
}

function HabitsList({ habitsList, reloadHabits }) {
    return (
        <>
            {habitsList.map(habit => (
                <Habit key={habit.id} habit={habit} reloadHabits={reloadHabits} />
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
    reloadHabits 
}) {
    const { user } = useContext(UserContext);
        
    function deleteThis() {
        console.log(habit);
        
        const confirmation = window.confirm("Tem certeza de que quer deletar este hábito? Esta ação não poderá ser desfeita.");
        
        if(confirmation) {
             deleteHabit(habit.id, user.token).then(() => {
                reloadHabits();
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

const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-family: 'Lexend Deca', sans-serif;
    align-items: center;
    margin-bottom: 20px;

    h1 {
        font-size: 23px;
        color: #126BA5;
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

const HabitStyle = styled.div`
    width: 100%;
    height: 91px;
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


