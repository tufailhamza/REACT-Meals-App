import { useRef , useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css'

const MealItemForm = props =>
{
    const [amountisvalid, setamountisvalid]= useState(true);
    const amountInputRef = useRef();
    const submitHandler = event =>
    {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enterednumber =  +enteredAmount;
    if (enteredAmount.trim().length === 0 || enteredAmount < 1 ||enteredAmount > 5) {
        setamountisvalid(false);
        return;
    }
    props.onAddtocart(enterednumber);
    }
    return(
        <form className={classes.form} onSubmit={submitHandler}>
     <Input label="Amount" input={{
        ref:amountInputRef,
        id:"ammount",
        type:"number",
        min:'1',
        max:'5',
        step:'1',
        defaultValue:'1'
     }}/>
     <button>+ Add</button>
     {!amountisvalid && <p>Please Enter a Valid amount (1-5). </p>}
        </form>
    )
}
export default MealItemForm;