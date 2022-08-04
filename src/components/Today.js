import UserContext from "../contexts/UserContext";
import Page from "../assets/styles/Page";
import Header from "../assets/styles/Header";
import { useContext, useState, useEffect } from "react";
import { getTodaysHabits, postCheckHabit, postUncheckHabit } from "../services/trackIt";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import styled from "styled-components";

export default function Today() {
    const [date, setDate] = useState("");
    const { user } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [done, setDone] = useState({
        all: 0,
        done: 0,
        percentage: 0
    });
    
    function formatDate() {
        let date = dayjs().locale('pt-br').format('dddd, DD/MM');
        date = date[0].toUpperCase() + date.substring(1);

        return date;
    }

    function loadHabits() {
        getTodaysHabits(user.token).then(answer => {
            setHabits(answer.data);

            if(answer.data.length !== 0) {   
                const all = answer.data.length;
                const doneTasks = answer.data.filter(habit => habit.done === true).length;
                
                answer.data.forEach(habit => {
                    setDone({...done, 
                        all: all,
                        done: doneTasks,
                        percentage: (doneTasks / all * 100)
                    });
                });
            } 
        });

        setDate(formatDate);
    }
    
    useEffect(loadHabits, []);

    return (
        <Page>
            <Header location="/hoje" done={done.done}>
                <h1>{date}</h1>
                {done.done === 0 ? (
                    <p>Nenhum hábito concluído ainda</p>
                ) : (
                    <p>{`${done.percentage}% dos hábitos concluidos`}</p>
                )}   
            </Header>

            <HabitsList habits={habits} loadHabits={loadHabits} />
        </Page>
    );
}

function HabitsList({ habits, loadHabits }) {
    return (
        <>
            {habits.map(habit => (
                <Habit key={habit.id} habit={habit} loadHabits={loadHabits} />
            ))}
        </>
    );
}

function Habit({ habit, loadHabits }) {
    const { user } = useContext(UserContext);
    
    function handleCheck() {
        if(habit.done) {
            postUncheckHabit(habit.id, user.token).then(() => {
                loadHabits();
            });
        } else {
            postCheckHabit(habit.id, user.token).then(() => {
                loadHabits();
            });
        }
    }

    return (
        <HabitStyle checked={habit.done}>
            <div>
                <h5>{habit.name}</h5>

                <span>
                    <p>Sequência atual:&nbsp;</p>
                    {habit.currentSequence === 1 ? (
                        <CurrentSequence checked={habit.done}>{`${habit.currentSequence} dia`}</CurrentSequence>                   
                    ) : (
                        <CurrentSequence current={habit.done}>{`${habit.currentSequence} dias`}</CurrentSequence>
                    )}
                </span>

                <span>
                    <p>Sequência recorde:&nbsp;</p>
                    {habit.currentSequence === 1 ? (
                        <HighestSequence 
                            checked={habit.done}
                            highest={habit.highestSequence} 
                            current={habit.currentSequence}
                        >{`${habit.highestSequence} dia`}</HighestSequence>                   
                    ) : (
                        <HighestSequence 
                            checked={habit.done}
                            highest={habit.highestSequence} 
                            current={habit.currentSequence}
                        >{`${habit.highestSequence} dias`}</HighestSequence>
                    )}
                </span>
            </div>

            <ion-icon name="checkbox" onClick={handleCheck}></ion-icon>
        </HabitStyle>
    );
}

const HabitStyle = styled.div`
    display: flex;
    width: 100%;
    min-height: 94px;
    padding: 15px 13px;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 10px;
    justify-content: space-between;

    p {
        margin: 0;
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }

    h5 {
        font-family: 'Lexend Deca', sans-serif;
        color: #666666;
        font-size: 20px;
        margin-bottom: 10px;
        font-weight: 400;
    }

    ion-icon {
        color: ${props => props.checked ? '#8FC549' : '#EBEBEB'};
        height: 69px;
        width: 69px;
    }

    span {
        display: flex;
        width: 100%;
    }
`;

const CurrentSequence = styled.p`
    color: ${props => props.checked ? '#8FC549' : '#666666'} !important;
`;

const HighestSequence = styled.p`
    color: ${props => ((props.current === props.highest) && props.checked) ? '#8FC549' : '#666666'} !important;
`;