import { useContext, useEffect,useState } from "react";
import CartIcon from "../Cart/CartIcon";
import clases from './HeaderCartButton.module.css'
import CartContext from "../../Store/cart-context";
const HeaderCartButton =(props)=>
{
    const [btnHighlighted,setbtnHiglightes]=useState(false);
    const cartCtx = useContext(CartContext);
    const CartItems = cartCtx.items.reduce((Current,item)=>{return Current+item.amount},0);
    const btnClasses = `${clases.button} ${btnHighlighted ? clases.bump : ''}`;
    const {items} = cartCtx;
    useEffect(()=>
    {
        if ( items.length===0) {
            return;
        }
     setbtnHiglightes(true);
     const timer = setTimeout(()=>
     {
        setbtnHiglightes(false);
     },300)
     return () => clearTimeout(timer);
    },[items]);
   return(
   <button className={btnClasses} onClick={props.onClick}>
    <span className={clases.icon}>
        <CartIcon/>
    </span>
    <span>Your Cart</span>
    <span className={clases.badge}>
        {CartItems}
    </span>
   </button>
   )
}
export default HeaderCartButton;