import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface props {
    onHide : () => void,
    onSave: any,
    id: number,
    username: string
    show:boolean
}
const EditUser = ({onHide, id, username, show, onSave}: props) => {
    const [form, setForm] = useState({
        username: '',
        job: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) :void => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const hideForm = () => {
        setForm({
            username: '',
            job: ''
        })
        onHide()
    }


    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault()
        onSave(form.username, id, form.job)
        hideForm()
    }
    
    return (
      <Modal
        show={show}
        onShow={() => setForm({
            job:'',
            username
        })}
        onHide={hideForm}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit A User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit} className=" m-5">
                <Form.Group className="m-3">
                    <Form.Label htmlFor="username" className="text-left">Name</Form.Label>
                    <Form.Control name="username" value={form.username} onChange={handleChange} id="username" placeholder="Name" type="text" required/>
                </Form.Group>
                <Form.Group className="m-3">
                    <Form.Label htmlFor="job">Job</Form.Label>
                    <Form.Control value={form.job} name="job" onChange={handleChange} id="job" placeholder="Job" type="text" required />
                </Form.Group>       
                <div className="grid text-center my-5">
                    <input type={'submit'} hidden />
                </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
}


export default EditUser