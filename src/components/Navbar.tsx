import {Nav} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useUserAuthDispatchContext } from "../App"

const NavBar = () => {
    const navigate = useNavigate()
    const authDispatch = useUserAuthDispatchContext()

    const logout = () => {
        authDispatch({
            email: '',
            token: ''
        })
        localStorage.removeItem("testToken")
        localStorage.removeItem("testEmail")
    }
    return (
        <Nav
            onSelect={(selectedKey) => navigate(`${selectedKey}`)}
            className="justify-content-end my-3"
            >
            <Nav.Item>
                <Nav.Link eventKey="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/account">Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="btn btn-primary text-white" onClick={logout} eventKey="/login">Logout</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default NavBar