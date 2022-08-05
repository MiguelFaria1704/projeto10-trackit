import Logo from "../assets/styles/Logo"
import Form from "../assets/styles/Form"
import Container from "../assets/styles/Container"
import logo from "../assets/logo.png";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { postLogin } from "../services/trackIt";
import { ThreeDots } from "react-loader-spinner"


export default function Login() {
    const { setUser } = useContext(UserContext);
    const [required, setRequired] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    function handleForm({ name, value }) {
        setForm({...form, [name]: value})
    }

    function handleLogin(e) {
        setRequired(false);
        setDisabled(true);
        e.preventDefault();

        const body = {
            email: form.email,
            password: form.password
        }
        

        postLogin(body).then(answer => {
            setUser({
                name: answer.data.name,
                image: answer.data.image,
                token: answer.data.token,
                progress: [0]
            });
            
            navigate("/hoje");
        });
        
        postLogin(body).catch(answer => {  
            setRequired(true);
            setDisabled(false);
            setForm({
                email: "",
                password: ""
            });

            alert("Falha no login! Preencha os campos novamente com informações válidas.");     
        }); 
    }

    return (
        <Container>
            <Logo>
                <img src={logo} alt="logo" />
                <h1>TrackIt</h1>
            </Logo>    

            <Form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="email" 
                    name="email"
                    required={required}
                    disabled={disabled}
                    value={form.email}
                    onChange={(e) => handleForm({
                        name: e.target.name,
                        value: e.target.value
                    })}
                />

                <input 
                    type="password" 
                    placeholder="senha" 
                    name="password"
                    required={required}
                    disabled={disabled}
                    value={form.password}
                    onChange={(e) => handleForm({
                        name: e.target.name,
                        value: e.target.value
                    })} 
                />

                {required ? (
                    <input type="submit" value="Entrar" />
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
                

                <Link to="/cadastro" style={{ textDecoration: 'none' }}><p>Não tem uma conta? Cadastre-se!</p></Link>
            </Form>
        </Container>
    );
   
}

