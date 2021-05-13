import classes from './Checkout.module.css';
import {useRef , useState} from 'react'

const isEmpty = value => value.trim() === "";
const isNotfiveChars = value => value.trim().length !==5
const Checkout = (props) => {
    const [formInputs,setForm] = useState({
        name: true,
        street:true,
        city:true,
        postalCode:true

    }) 
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    // console.log(event);
    const enteredName = nameInputRef.current.value;
    const enteredstreet= streetInputRef.current.value;
    const enteredPostal= postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enterNameisValid = !isEmpty(enteredName)
    const enterStreetisValid = !isEmpty(enteredstreet)
    const enterPostalisValid = !isNotfiveChars(enteredPostal);
    const enterCityisvalid = !isEmpty(enteredCity)
    setForm({
        name:enterNameisValid,
        street:enterStreetisValid,
        city: enterCityisvalid,
        postalCode: enterPostalisValid
    })
    const formIsvalid = enterNameisValid && enterStreetisValid && enterPostalisValid && enterCityisvalid;
    if(!formIsvalid){
        return;
    }
    props.onConfirm({
        name:enteredName,
        street:enteredstreet,
        city:enteredCity,
        PostalCode:enteredPostal
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputs.name ? '':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputs.name &&<p>Please enter valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputs.street ? '':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref = {streetInputRef} />
        {!formInputs.street &&<p>Please enter valid street</p>}
      </div>
      <div className={`${classes.control} ${formInputs.postalCode ? '':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref= {postalInputRef}/>
        {!formInputs.postalCode &&<p>Please enter valid postal code</p>}
      </div>
      <div className={`${classes.control} ${formInputs.city ? '':classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputs.city &&<p>Please enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancle}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;