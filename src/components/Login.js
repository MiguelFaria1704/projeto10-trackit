import Logo from "../assets/styles/Logo"
import Form from "../assets/styles/Form"
import Container from "../assets/styles/Container"
import logo from "../assets/logo.png";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { postLogin } from "../services/tracklt";
import { ThreeDots } from "react-loader-spinner"


export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [form, setForm] = useState({});
    const [required, setRequired] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

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
        console.log(body);

        /* postLogin(body).then(answer => {
            setUser(answer.data.token);
            setForm({});
            
            navigate("/hoje");
        });  */  
        
        postLogin(body).catch(answer => {  
            setRequired(true);
            setDisabled(false);
            setForm({});

            answer.data.message === undefined ? 
                alert("Ocorreu um erro inesperado. Preencha os campos novamente com informações válidas.") :
                alert("answer.data.message");
        }); 
    }

    return (
        <Container>
            <Logo>
                <img src={logo} alt="logo" />
                <h1>Tracklt</h1>
            </Logo>    

            <Form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="email" 
                    name="email"
                    required={required}
                    disabled={disabled}
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

