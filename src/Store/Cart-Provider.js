import { useReducer } from "react";
import CartContext from "./cart-context";
const  defaultCartState={
    items: [],
    TotalAmount:0
}
const CartReducer =  (state,action)=>{
    if (action.type==='ADD') 
    {
        const updateditemsAmount =state.TotalAmount+action.item.price*action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item=> item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if (existingCartItem) {
            let updatedItem;
            updatedItem={
                ...existingCartItem,
                amount:    existingCartItem.amount +action.item.amount  
            }
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem
        }
        else{
            updatedItems= state.items.concat(action.item);
        }
        return {
            items:updatedItems,
            TotalAmount:updateditemsAmount
        }
    }
    else if(action.type === 'REMOVE')
    {
        const existingCartItemIndex = state.items.findIndex(item=> item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedtotalAmount =state.TotalAmount - existingCartItem.price;
        let updatedItems;
        if (existingCartItem.amount ===1 ) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else
        {
          const updatedItem= {...existingCartItem,amount :existingCartItem.amount -1}
          updatedItems=[...state.items];
          updatedItems[existingCartItemIndex] = updatedItem
        }
        return {
            items:updatedItems ,
            TotalAmount:updatedtotalAmount
        }
    }
    if (action.type === 'CLEAR') {
        return   defaultCartState ;
        
    }
     return defaultCartState;
};
const CartProvider =(props)=>
{
    
   const [cartState,dispatchCartAction]=useReducer(CartReducer,defaultCartState);
   const addItemHandlertoCart = item => {
    dispatchCartAction({type: 'ADD',item:item})
   };
   const removeItemHandlertoCart = id =>{
    dispatchCartAction({type: 'REMOVE',id:id })
   };
   const clearCartHandler = ()=>
   {
    dispatchCartAction({type: "CLEAR"  })
   }
   const cartContext = {
    items: cartState.items,
    TotalAmount:cartState.TotalAmount,
    addItem:addItemHandlertoCart,
    removeItem:removeItemHandlertoCart,
    clearcart : clearCartHandler
   }
   return(
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
   )
}
export default CartProvider;