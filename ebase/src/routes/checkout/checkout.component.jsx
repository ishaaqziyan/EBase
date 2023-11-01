import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const Checkout = () => {
    const {cartItems, addItemToCart,removeItemFromCart} = useContext(CartContext);
    return(
        <div>
            <h1>I am the checkout page</h1>
            <div>
                {cartItems.map((cartItem) => {
                    const {id, name, quantity} = cartItem;
                     return <div key ={id}>
                        <h2>{name}</h2>
                        <span>{quantity}</span>
                        <br/>
                        <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
                        <br/>
                        <span onClick ={()=> addItemToCart(cartItem)}>increment</span>
                        <br/>
                     </div> 
                     })}
            </div>
        </div>
    )
}
export default Checkout;