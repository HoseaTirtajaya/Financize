import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function AddExpenseModal({show, handleClose, props}) {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetRef = useRef();
    async function handleSubmit(e){
        e.preventDefault();
        console.log(descriptionRef, amountRef, budgetRef)
        try{
            let token = localStorage.getItem("token");
            let desc = descriptionRef.current.value;
            let amount = parseFloat(amountRef.current.value);
            let budgetId = budgetRef.current.value;
            const BASE_URL = process.env.REACT_APP_API_URL;

            const response = await fetch(`${BASE_URL}/api/finance/add/expenses`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'token': token},
                body: JSON.stringify({ desc: desc, amount: amount, budget_id: budgetId })
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
                  <Modal.Title>New Expense</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group className='mb-3' controlId='desc'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control ref={descriptionRef} type='text' required/>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='amount'>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control type='number' ref={amountRef} required min={0} step={0.01}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select ref={budgetRef}>
                {props ? props.finance.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                )) : null}
            </Form.Select>
          </Form.Group>
                  <div className='d-flex justify-contend end'>
                      <Button variant="primary" type='submit'>Add</Button>
                  </div>
              </Modal.Body>
          </Form>
      </Modal>
  )
}
