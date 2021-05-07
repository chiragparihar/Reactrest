import Header from './components/Layout/Header'
import {useState} from 'react'
import Cart from './components/Cart/Cart'
import Meals from './components/Meals/Meals'
import CartProvide from './store/CartProvider';
function App() {

  const [cartIsShown,setCart] = useState(false);

  const showCardHandler = () =>{
    setCart(true);
  }
  const HideCartHandler = () =>{
    setCart(false);
  }
  return (
    <CartProvide>
      {cartIsShown && <Cart onHide = {HideCartHandler}/>}
      <Header show = {showCardHandler}/> 
      <main>
        <Meals />
      </main>
      </CartProvide>
   
  );
}

export default App;
