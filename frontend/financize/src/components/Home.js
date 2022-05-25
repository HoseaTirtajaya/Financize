import React, { useEffect, useState} from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import  BudgetCard  from "./BudgetCard";
import { useNavigate} from "react-router-dom"
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import TotalBudgetCard from "./TotalBudgetCard";
import ViewExpenseModal from "./ViewExpensesModal";
  
export default function(props){
  const navigate = useNavigate();
  let [dashboardData, setDashboardData] = useState();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [setAddExpenseModalBudgetId] = useState()

  let token = localStorage.getItem("token") ? true : false;
  let tokenData = localStorage.getItem("token");

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  function handleLogoutData(){
    localStorage.removeItem("token");
    navigate("/login");
  }

  if(token){
    useEffect(() => {
      try {
          fetch("http://localhost:8000/api/finance/dashboard", {
          method: "GET",
          headers: { 'Content-Type': 'application/json', 'token': tokenData },
          }).then(async (financeData) => {
            let responseData = await financeData.json();
            setDashboardData(responseData)
          }).catch((err) => console.log(err));
      } catch (e) {
          console.log(e);
      }
    }, []);

    let cardList = [];

    if(dashboardData !== undefined){
      dashboardData.finance.forEach((item) => {
        cardList.push(<BudgetCard key={item.id} name={item.name} gray amount={item.current_amount} max={item.amount} onAddExpenseClick={() => openAddExpenseModal(item.id)} onViewExpenseClick={() => setViewExpensesModalBudgetId(item.id)} />);
      });
    }

    return (
      <>
      <Container className="my-4 ">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => setShowAddExpenseModal(true)}>Add Expense</Button>
          <Button variant="outline-danger" onClick={() => handleLogoutData()}>Logout</Button>
        </Stack>
        <div style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1rem", 
          alignItems: "flex-start"
          }}>
         {cardList}
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal props={dashboardData} show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)}/>
      <TotalBudgetCard props={dashboardData}/>
      <ViewExpenseModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
        props={dashboardData}
      />
    </>
    );
  } else {
    useEffect(() => {
      navigate("/login")
  },[])
  }
}