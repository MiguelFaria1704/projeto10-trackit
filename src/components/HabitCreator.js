import styled from "styled-components";
import Form from "../assets/styles/Form";
import CheckBox from "../assets/styles/CheckBox";
import { useState } from "react";
import { postHabit } from "../services/tracklt";
import { ThreeDots } from "react-loader-spinner";

export default function HabitCreator( { 
    setCreate, 
    user, 
    reloadHabits
} ) {
    const [days, setDays] = useState([]);
    const [name, setName] = useState("");
    const [required, setRequired] = useState(true);
    const [disabled, setDisabled] = useState(false);
    
    function handleSubmit(e) {
        setRequired(false);
        setDisabled(true);
        e.preventDefault();
        
        const body = {
            name: name,
            days: days
        }

        const promise = postHabit(body, user.token);

        promise.then(answer => {
            setDays([]);
            setName("");
            setCreate(false);
            reloadHabits();
        });

        promise.catch(answer => {
            setRequired(true);
            setDisabled(false);

            alert("Não foi possível salvar o seu hábito.")
        });
    }
    
    return (
        <NewHabit>
            <Form onSubmit={handleSubmit} disabled={disabled}>
                <input 
                    type="text" 
                    name="name"
                    required={required}
                    disabled={disabled}
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                
                <Day day={7} setDays={setDays} days={days} disabled={disabled} />   
                <Day day={1} setDays={setDays} days={days} disabled={disabled} />
                <Day day={2} setDays={setDays} days={days} disabled={disabled} />
                <Day day={3} setDays={setDays} days={days} disabled={disabled} />
                <Day day={4} setDays={setDays} days={days} disabled={disabled} />
                <Day day={5} setDays={setDays} days={days} disabled={disabled} />
                <Day day={6} setDays={setDays} days={days} disabled={disabled} />
            
                <Finish>
                    <button name="cancel" disabled={disabled} onClick={() => setCreate(false)}>Cancelar</button>
                    
                    {required? (
                        <input type="submit" name="save" value="Salvar" />
                    ) : (
                        <div>  
                            <ThreeDots
                                type="ThreeDots"
                                color="rgb(250, 250, 250)"
                                height={13}
                                width={51}
                                timeout={0}
                            />
                        </div> 
                    )}
                </Finish>
            </Form>
        </NewHabit>
    ); 
}

function Day({ 
    day, 
    setDays, 
    days,
    disabled 
}) {
    const [checked, setChecked] = useState(false)

    function check(e) { 
        e.preventDefault();

        checked ? (
            setDays(days.filter(item => item !== day))
        ) : (
            setDays([...days, day]) 
        )

        setChecked(!checked);
    }
    
    return (
        <CheckBox
            disabled={disabled} 
            checked={checked}
            onClick={check}
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

const NewHabit = styled.div`
    width: 100%;
    height: 180px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px;
    border-radius: 5px;
    margin: 20px;

    form {
        margin: 0;
    }

    input[type="submit"] {
        height: 35px;
        width: 84px;
        margin-left: 20px;
        font-size: 16px;
    }

    button[name="cancel"] {
        border: none;
        background-color: transparent;
        font-size: 16px;
        color: #52B6FF;
    }

    button[name="cancel"]:disabled {
        color: rgba(82, 182, 255, 0.5);
    }

`;

const Finish = styled.div`
    margin-top: 29px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end !important;
    background-color: transparent !important;

    div {
        width: 84px;
        height: 35px;
        margin-left: 20px;
        padding-right: 10px;
    }
`;