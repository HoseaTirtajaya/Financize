import React from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'
import { CurrencyFormatter } from '../utils'

export default function ViewExpenseModal({budgetId, handleClose, props}) {
    const BASE_URL = process.env.REACT_APP_API_URL;
    let propData = props ? props.finance.filter(item => item.id === budgetId) : null;
    let titleName = propData && propData.length > 0 ? propData[0].name : "Loading..."
    let showModal = budgetId ? true : false;
    let tokenData = localStorage.getItem("token");
    
    async function handleDeleteExpense(budgetId){
        try {
            const response = await fetch(`${BASE_URL}/api/finance/delete/expense/${budgetId}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json', token: tokenData},
            });
            const data = await response.json();
            if(response.status === 400){
                alert(data.message)
            } else {
                console.log(data)
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
                <Stack direction="horizontal" gap="2">
                <div>Expenses - {titleName}</div>
                </Stack>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Stack direction="vertical" gap="3">
                {
                    propData && propData.length ? propData[0].financial_expenses.map(item => {
                        return (
                        <Stack direction="horizontal" gap="2" key={item.id}>
                            <div className="me-auto fs-4">{item.name}</div>
                            <div className="fs-5">
                            {CurrencyFormatter.format(item.amount)}
                            </div>
                            <Button
                            onClick={() => handleDeleteExpense(item.id)}
                            size="sm"
                            variant="outline-danger"
                            >
                            &times;
                            </Button>
                        </Stack>

                        )
                    }) : "Loading"
                    
                }
                {/* {expenses.map(expense => (
                <Stack direction="horizontal" gap="2" key={expense.id}>
                    <div className="me-auto fs-4">{expense.description}</div>
                    <div className="fs-5">
                    {CurrencyFormatter.format(expense.amount)}
                    </div>
                    <Button
                    onClick={() => deleteExpense(expense)}
                    size="sm"
                    variant="outline-danger"
                    >
                    &times;
                    </Button>
                </Stack>
                ))} */}
            </Stack>
            </Modal.Body>
        </Modal>
        )
}
