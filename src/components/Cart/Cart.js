import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout'
import classes from './Cart.module.css'
import CartContext from "../../Store/cart-context"
const Cart = (props) => {
    const [isCheckout, SetIsCheckout] = useState(false);
    const [isSubmitted, setSubmitting] =useState(false);
    const [didsubmit,setdidsubmit]= useState(false)
    const cartctx = useContext(CartContext);
    const TotalAmount = `$${cartctx.TotalAmount.toFixed(2)}`
    const cartItemRemoveHandler = (id) => {
        cartctx.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        cartctx.addItem({ ...item, amount: 1 })
    }
    const SubmitOrderHandler= async (userdata)=>
    {
       setSubmitting(true);
      const res = await fetch('https://react-meals-4b0a7-default-rtdb.firebaseio.com/%20orders.json',
      {
        method: "POST",
        body:JSON.stringify({
           user: userdata,
           orderdereditems :cartctx.items
        })
      })
      setSubmitting(false);
      setdidsubmit(true);
      cartctx.clearcart();
    }
    const hasItem = cartctx.items.length > 0;
    const orderHandler = () => {
        SetIsCheckout(true)
    }
    const cartItem = (
        <ul className={classes['cart-items']}>
            {cartctx.items.map((item) =>
                (<CartItem key={item.id} id={item.id} name={item.name} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />))}
        </ul>
    );
    const ModalAction = (<div className={classes.actions}>
        <button className={classes['buttin--alt']} onClick={props.onClose}>Close</button>
        {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>)
const CartModalData = ( <>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{TotalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfrim={SubmitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout && ModalAction}
             </>)
const isSubmittingModalContent = <p>Sending Order data...</p>
const didSubmittedModalContent = <p>Sucessfully sent the order!</p>
    return (
        <Modal onClose={props.onClose}>
     {!isSubmitted && !didsubmit && CartModalData}
     {isSubmitted  && isSubmittingModalContent  }
     {!isSubmitted && didsubmit  && didSubmittedModalContent  }

     </Modal>
    )
}
export default Cart;