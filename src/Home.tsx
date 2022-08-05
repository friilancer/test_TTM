import { useEffect, useState } from "react"
import axios from "axios";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Navbar";
import EditUser from "./components/EditUser";
import { useUserAuthStateContext } from "./App";


interface user {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

interface response {
    page: number
    per_page: number,
    total: number,
    total_pages: number,
    data: user[]
}

const Home = () => {
    const [users, setUsers] = useState<Array<user>>([])
    const userAuth = useUserAuthStateContext()
    const [showEditUserModal, setShowEditUserModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [currentSelection, setCurrentSelection] = useState({
        id: 0,
        first_name: '',
        last_name: ''        
    })

    const handleAddClose = () :void => setShowEditUserModal(false)
    
    const handleSave = async(username:string, id:number, job:string) => {
        try{
            const {status} = await axios.put(`https://reqres.in/api/users/${id}`, {
                name: username,
                job
            })
            status === 200 && alert('User was successfully edited')
        }catch(e){
            alert('Failed to edit user')
        }
    }

    const goToNextPage = () :void => {
        currentPage < totalPages && setCurrentPage(value => ++value)
    }

    const goToPrevPage = () :void => {
        currentPage > 1 && setCurrentPage(value => --value)
    }

    const fetchUserData = async() => {
        try{
            const {data} = await axios.get(`https://reqres.in/api/users?page=${currentPage}`)    
            setUsers(data.data)    
            setTotalPages(data.total_pages)        
        } catch (e){
            alert('Failed to get user')
        }
    }

    useEffect(() => {
        fetchUserData()
    },[currentPage])

    const onEditUser = (user:user) => {
        setShowEditUserModal(true)
        setCurrentSelection({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name
        })
    }

    const onDeleteUser = async(id:number) => {
        try{
            const {status} = await axios.delete(`https://reqres.in/api/users/${id}`) 
            status === 204 && alert('Deleted User successfully')
        }catch (e){
            alert('Failed to delete user')
        }
    }

    return (
        <Container fluid="md">
            <NavBar />
            <h2 className="text-center m-4">Users Page</h2>
            <h6>You're now logged in as {userAuth.email}</h6>
            <EditUser id={currentSelection.id} username={`${currentSelection.first_name} ${currentSelection.last_name}`}  onSave={handleSave} show={showEditUserModal} onHide={handleAddClose} />
            <Row>
                {
                    users.map((user) => {
                        return (
                            <Col key={user.id} className="text-center m-2  rounded p-2 py-3">
                                <div className="d-grid align-items-center mb-3 justify-content-center">
                                    <div>
                                        <img src={user.avatar} className="img-fluid mb-2" alt={user.first_name} />
                                    </div>
                                    <div className="d-block">{`${user.first_name} ${user.last_name}`}</div>
                                    <div className="d-block">{`${user.email}`}</div>
                                    <div className="d-flex mt-5 justify-content-between">
                                        <Button className="btn-sm" onClick={() => onEditUser(user)}>Edit</Button>
                                        <Button className="btn-sm btn-danger" onClick={() => onDeleteUser(user.id)}>Delete</Button>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>

            <div className="row m-4 text-center">
                <div className="col-6">
                    <Button className={`px-5 btn-md ${currentPage === 1 && 'btn-secondary'}`} onClick={goToPrevPage}>Prev</Button>
                </div>
                <div className="col-6">
                    <Button className={`px-5 btn-md ${currentPage === totalPages && 'btn-secondary'}`} onClick={goToNextPage}>Next</Button>
                </div>
            </div>
        </Container>
    )
}

export default Home