import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import  BudgetCard  from "./BudgetCard";

import { requestLoginData } from "../actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.requestLoginData();
  }

  render() {
    console.log(this.props.data)
    return (
        <Container className="my-4 ">
          <Stack direction="horizontal" gap={2} className="mb-4">
            <h1 className="me-auto">Budgets</h1>
            <Button variant="primary">Add Budget</Button>
            <Button variant="outline-primary">Add Expense</Button>
          </Stack>
          <div style={{
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
            gap: "1rem", 
            alignItems: "flex-start"
            }}>
            <BudgetCard name="Entertainment" gray amount={2500000} max={5000000}></BudgetCard>
          </div>
        </Container>
      );
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestLoginData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);