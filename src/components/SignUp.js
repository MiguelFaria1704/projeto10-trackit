import Logo from "../assets/styles/Logo"
import Form from "../assets/styles/Form"
import Container from "../assets/styles/Container"
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { postSignUp } from "../services/trackIt";
import { ThreeDots } from "react-loader-spinner"
import { useState } from "react";

export default function SignUp() {
    const [required, setRequired] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });
    
    function handleForm({ name, value }) {
        setForm({...form, [name]: value})
    }

    function handleSignUp(e) {
        setRequired(false);
        setDisabled(true);
        e.preventDefault();

        const body = {
            email: form.email,
            name: form.name,
            image: form.image,
            password: form.password
        }

        postSignUp(body).then(answer => {  
            navigate("/");
        }); 

        postSignUp(body).catch(() => {  
            setRequired(true);
            setDisabled(false);
            setForm({
                email: "",
                name: "",
                image: "",
                password: ""
            });

                alert("Falha no cadastro! Preencha os campos novamente com informações válidas.") 
        }); 
        
        
    }

    return (
        <Container>
            <Logo>
                <img src={logo} alt="logo" />
                <h1>TrackIt</h1>
            </Logo>    

            <Form onSubmit={handleSignUp}>
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

                <input 
                    type="text" 
                    placeholder="nome" 
                    name="name"
                    required={required}
                    disabled={disabled}
                    value={form.name}
                    onChange={(e) => handleForm({
                        name: e.target.name,
                        value: e.target.value
                    })} 
                />

                <input 
                    type="url" 
                    placeholder="foto" 
                    name="image"
                    required={required}
                    disabled={disabled}
                    value={form.image}
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

                <Link to="/" style={{ textDecoration: 'none' }}><p>Já tem uma conta? Faça login!</p></Link>
            </Form>
        </Container>
    );
}