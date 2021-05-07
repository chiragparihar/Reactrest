import classes from './Cart.module.css'
import CartItem from './CartItem'

import Modal from '../UI/Modal'
import {useContext} from 'react'
import CartContent from '../../store/cart-context';
const Cart = props =>{
    const CardCtx = useContext(CartContent);
    const cartItemRemoveHandler = id =>{
        CardCtx.removeItem(id);
    };
    const cartItemAddHandler = item =>{
        CardCtx.addItem({...item,amount:1})
    };
    const CartItems = <ul className = {classes['cart-items']}>{CardCtx.items.map((item) =>{
        return <CartItem key={item.id} name = {item.name} amount  = {item.amount} price= {item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd = {cartItemAddHandler.bind(null,item)}/>
    })} </ul>;
    const totalAmount = CardCtx.totalAmount.toFixed(2);
    const hasItems = CardCtx.items.length > 0;

    return(
        <Modal hide = {props.onHide}>
            {CartItems}
            <div className= {classes.total}>
             <span>Total Amount</span>
             <span>{totalAmount}</span>
            </div>
            <div className = {classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHide}>Close</button>
                {hasItems && <button className = {classes.button}>Order</button>}
            </div>
        </Modal>
    )

}

export default Cart;