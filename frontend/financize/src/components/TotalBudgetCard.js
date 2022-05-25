import BudgetCard from "./BudgetCard"

export default function TotalBudgetCard(props) {
    let propsData = props.props !== undefined ? props.props.finance : null;
    let maxAmt = 0;
    let curAmt = 0;
    if(propsData != null ){
        propsData.map(item => {
            maxAmt += parseFloat(item.amount);
            curAmt += parseFloat(item.current_amount);
            return "done"
        });
    }
  if (maxAmt === 0) return null

  return <BudgetCard amount={curAmt} name="Total" gray max={maxAmt} hideButtons />
}