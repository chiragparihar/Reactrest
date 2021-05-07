import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import {useContext,useEffect , useState} from 'react'
import CartContext from '../../store/cart-context';
const HeaderCartButton = props =>{
    const [btn,setBtn]=useState(false);
    const cartCtx = useContext(CartContext);
    const noOfCartItems = cartCtx.items.reduce((current,item) =>{
        return current + item.amount;
    },0);
    const {items} = cartCtx;
    const btnClasses = `${classes.button} ${btn ? classes.bump : ''}`
    useEffect(()=>{
        if(items.length === 0){ return ;}
        setBtn(true);
        const timer = setTimeout(()=>{setBtn(false)},300)
        return () =>{
            clearTimeout(timer)
        }
    },[items])
    return<button className = {btnClasses} onClick={props.clicked}>
        <span className = {classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className = {classes.badge}>
            {noOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton