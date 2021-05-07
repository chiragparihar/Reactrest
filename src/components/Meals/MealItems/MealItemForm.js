
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input'
import {useRef, useState} from 'react'
const MealItemForm = props =>{
    const [amount,setAmount] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = (event) =>{
        event.preventDefault();
        const enteredAmountStr = (amountInputRef.current.value);
        const enteredAmount = +enteredAmountStr;
        if(enteredAmountStr.trim().length ===0 || enteredAmount < 1|| enteredAmount > 5){
            setAmount(false);
            return;
        }
        props.onAddToCart(enteredAmount);

    }
    return(
        <form className = {classes.form} onSubmit={submitHandler}>
        <Input ref= {amountInputRef} label="Amount" input={{id:'amount_'+props.id,type:'number',min:'1',max:'5',step:'1',defaultValue:'1'}}/>
        <button>+ Add</button>
        {!amount && <p> Please Enter a valid Amount (1-5).</p>}
        </form>

    );
}

export default MealItemForm