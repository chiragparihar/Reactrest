import CartContent from './cart-context'
import {useReducer} from 'react';


const defaultCartState = {
    items:[],
    totalAmount:0
};
const cartReducer = (state,action) =>{
    // console.log(action);
    if(action.type === 'ADD'){
       // const updatedItems = state.items.concat(action.item);
        const newTotalAmount = state.totalAmount+action.item.price*action.item.amount;
        const existingCartIdx = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartIdx];
       
        let updatedItems;
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount

            }
            updatedItems = [...state.items];
            updatedItems[existingCartIdx] = updatedItem;
        }
        else{
           
            updatedItems = state.items.concat(action.item);

        }
        return {
            items:updatedItems,
            totalAmount:newTotalAmount
        }
    }
    if(action.type === 'REMOVE'){
        // console.log(action);
        const existingCartIdx = state.items.findIndex(item => item.id === action.id)
        const existingItem = state.items[existingCartIdx];
        const updateTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else{
            const updatedItem = {...existingItem,amount:existingItem.amount -1};
            updatedItems = [...state.items];
            updatedItems[existingCartIdx] = updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount:updateTotalAmount
        }

    }
    return defaultCartState
    

}
const CartProvider = props =>{
    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);
    const addItemToCartHandler = (item) =>{
       dispatchCartAction({type:'ADD',item:item});
    };
    const removeItemFromCartHandler = (id) =>{
        dispatchCartAction({type:'REMOVE',id:id});
    };
    const cartContent ={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }; 
    return(
        <CartContent.Provider value={cartContent}>
            {props.children}
        </CartContent.Provider>
    )

};
export default CartProvider;