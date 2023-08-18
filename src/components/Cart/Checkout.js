import { useRef, useState } from 'react';
import classes from './Checkout.module.css';
const isEmpty = value => value.trim()=== '';
const isFiveChars = value => value.trim()=== 5;
const Checkout = (props) => {
   const [formInputValidity ,setformInputValidy] =useState(
    {
        name:true,
        street:true,
        city:true,
        postalcode:true
    }
   )
    const NameInputRef =useRef();
    const StreetInputRef =useRef();
    const PostalInputRef =useRef();
    const CityInputRef =useRef();
    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = NameInputRef.current.value;
        const enteredStreet = StreetInputRef.current.value;
        const enteredPostal = PostalInputRef.current.value;
        const enteredCity  = CityInputRef.current.value;
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = !isEmpty(enteredPostal);
 
        setformInputValidy({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            postalcode:enteredPostalCodeIsValid

        })
        const formisValid = enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsValid;
        if (!formisValid) {
            return
        }
        props.onConfrim({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postalcode: enteredPostal
        });
        console.log({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postalcode: enteredPostal
        });

  };

  return (

    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name ? "": classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={NameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street ? "": classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={StreetInputRef}/>
        {!formInputValidity.street && <p>Please enter a valid Street!</p>}

      </div>
      <div className={`${classes.control} ${formInputValidity.postalcode ? "": classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={PostalInputRef}/>
        {!formInputValidity.postalcode && <p>Please enter a valid Postal Code!</p>}

      </div>
      <div className={`${classes.control} ${formInputValidity.city ? "": classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={CityInputRef}/>
        {!formInputValidity.city && <p>Please enter a valid City!</p>}

      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;