import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function AddBudgetModal({show, handleClose}) {
    const nameRef = useRef();
    const maxRef = useRef();
    async function handleSubmit(e){
        e.preventDefault();
        console.log(nameRef.current.value, maxRef.current.value)
        try{
            let token = localStorage.getItem("token");
            let title = nameRef.current.value;
            let amount = parseFloat(maxRef.current.value);

            const response = await fetch("http://localhost:8000/api/finance/add/budget", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'token': token},
                body: JSON.stringify({ title, amount })
            });
            await response.json();
            handleClose();
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }
  return (
      <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                  <Modal.Title>New Budget</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group className='mb-3' controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control ref={nameRef} type='text' required/>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='max'>
                      <Form.Label>Maximum Spending</Form.Label>
                      <Form.Control type='number' ref={maxRef} required min={0} step={0.01}/>
                  </Form.Group>
                  <div className='d-flex justify-contend end'>
                      <Button variant="primary" type='submit'>Add</Button>
                  </div>
              </Modal.Body>
          </Form>
      </Modal>
  )
}
