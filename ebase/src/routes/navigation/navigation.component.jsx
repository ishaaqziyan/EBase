import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";
import { UserContext } from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartDropDown from '../../components/cart-dropdown/cart-dropdown-component';
import { CartContext, CartProvider } from "../../contexts/cart.context";

const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

    return(
     <Fragment>
            <NavigationContainer>
              <LogoContainer to ='/'>
                <CrwnLogo className='logo'/>
              </LogoContainer>  
             <NavLinks>
               <NavLink to='/shop'>
                   SHOP
               </NavLink>
               <br/>
               {
                currentUser ? (
                  <NavLink as = 'span' onClick={signOutUser}>
                    SIGN OUT
                  </NavLink>)
                  :( <NavLink to='/auth'>
                  SIGN IN
              </NavLink>
              )}
              <CartIcon/>
             </NavLinks>
             {isCartOpen && <CartDropDown/>}
            </NavigationContainer>
            <Outlet/>
     </Fragment>
    );
};

export default Navigation;