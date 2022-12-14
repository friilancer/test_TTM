import React, {useEffect, useState} from "react"
import axios from "axios";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap"
import { hasSpecialChar, isAlphaNumeric, isEmail, addMinutes } from "./helpers";
import { useUserAuthDispatchContext } from "./App";
import { useNavigate, useLocation, Location } from "react-router-dom";

interface stateType {
    from: { pathname: string | undefined }
}

const Login = () => {
    const [email, setEmail] = useState({
        text: '',
        error: false
    })
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as stateType

    const fromPage = state?.from?.pathname || "/home";

    const authDispatch = useUserAuthDispatchContext()
    useEffect(() => {
        setEmail({
            ...email,
            error: false
        })
    }, [email.text])

    const [password, setPassword] = useState({
        text: '',
        type: 'password',
        hasAlphaNumericError: true,
        hasSpecialCharacterError: true
    })

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({
            ...password,
            text: e.target.value,
            hasAlphaNumericError: !isAlphaNumeric(e.target.value),
            hasSpecialCharacterError: !hasSpecialChar(e.target.value)
        })
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        setEmail({
            ...email,
            text: e.target.value
        })
    }

    const togglePasswordType = (e : React.SyntheticEvent) : void => {
        e.preventDefault()
        password.type === 'password' ? setPassword({...password, type: 'text'}) : setPassword({...password, type: 'password'})
    }
    
    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try{
            if(!isEmail(email.text)) {
                setEmail({
                    ...email,
                    error: true
                })
                return
            }   
            
            if(password.hasAlphaNumericError || password.hasSpecialCharacterError || password.text.length < 8){
                alert('Please enter valid password')
                return 
            }

            const {status, data} = await axios.post(`https://reqres.in/api/login`, {
                email: email.text,
                password: password.text
            })        
            if(status === 200){
                localStorage.setItem('testToken', data.token)
                localStorage.setItem('testEmail', email.text)
                authDispatch({
                    email: email.text,
                    token: data.token
                })
                navigate(fromPage, {replace: true})
            }
        }catch(e){
            console.log(e)
            alert('Registration Failed')
        }
    }
    return (
        <div className="formContainer">
            <Container fluid="md">
                <Form onSubmit={onSubmit} className="border rounded m-5">
                    <Form.Group className="m-3">
                        <Form.Label htmlFor="email" className="text-left">Email</Form.Label>
                        <Form.Control className={`${email.error && 'border border-danger'}`} value={email.text} onChange={onEmailChange} id="email" placeholder="Email" type="email" required/>
                    </Form.Group>
                    <Form.Group className="m-3">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control value={password.text} minLength={8} onChange={onPasswordChange} id="password" placeholder="Password" type={password.type} required />
                    </Form.Group> 
                    <div className="d-flex justify-content-between w-100">
                        <span className="pointer fs-6 border roundede p-2 m-3 text-xs " onClick={() => navigate("/register")}>Sign up here</span>
                        <span className="pointer fs-6 text-decoration-underline m-3 text-xs " onClick={togglePasswordType}>{password.type === "text" ? 'hide' : 'show'} password</span>                        
                    </div>      
                    <div className="grid text-center my-5">
                        <Button type="submit" className="text-center px-5 py-2 w-md btn-xl">Login</Button> 
                    </div>
                </Form>
            </Container>
        </div>
    )   
}

export default Login