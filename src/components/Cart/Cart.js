import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'
import Modal from '../UI/Modal'
import {useContext , useState, Fragment} from 'react'
import CartContent from '../../store/cart-context';
const Cart = props =>{
    const [ischeckout,setCheckout] = useState(false)
    const [isSubmit,setSubmit] = useState(false)
    const [didSubmit,setDidSubmit] = useState(false)
    const CardCtx = useContext(CartContent);
    const cartItemRemoveHandler = id =>{
        CardCtx.removeItem(id);
    };
    const cartItemAddHandler = item =>{
        CardCtx.addItem({...item,amount:1})
    };
    const orderHandler = () =>{
        setCheckout(true)
    }
    const submitOrderHandler = async (data)=>{
        setSubmit(true);
        await fetch('https://reactmeals-e0a9d-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:data,
                orderedItems:CardCtx.items
            })
        });
        setDidSubmit(true)
        setSubmit(false)
        CardCtx.clearCart()
    }
   
    const totalAmount = `$${CardCtx.totalAmount.toFixed(2)}`;
    const hasItems = CardCtx.items.length > 0;
    
    const CartItems = (<ul className = {classes['cart-items']}>{CardCtx.items.map((item) =>{
            return <CartItem key={item.id} name = {item.name} amount  = {item.amount} price= {item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd = {cartItemAddHandler.bind(null,item)}/>
        })} </ul>)
    
    
    const modalActions = <div className = {classes.actions}>
    <button className={classes['button--alt']} onClick={props.onHide}>Close</button>
    {hasItems && <button className = {classes.button} onClick ={orderHandler}>Order</button>}
    </div>;

    const cartContents =   <Fragment>
        {CartItems}
        <div className= {classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
        </div>
        <div>
            {ischeckout && <Checkout onCancle={props.onHide} onConfirm={submitOrderHandler}/>}
            {!ischeckout && modalActions}
        </div>
    </Fragment>
    const  isSubmitting = <p>Sending order data...</p> ;
    const didsubmitting = <Fragment>
        <p>Sucessfully sent order</p>
        <div className = {classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHide}>Close</button>
        </div>
        </Fragment>
    return(
        <Modal hide = {props.onHide}>
          {!isSubmit && !didSubmit && cartContents}
          {isSubmit && isSubmitting}
          {didSubmit && !isSubmit && didsubmitting}
        </Modal>
    )

}

export default Cart;