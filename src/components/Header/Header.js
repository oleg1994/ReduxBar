import React from 'react';
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import './Header.css';
import {useSelector} from 'react-redux'
import cartImg from './../../media/shopping-cart.svg'
import logo from './../../media/reduxTail.svg'


function Header() {
  const Cart = useSelector((state)=>state.cart)
  return (
    <div className="headerWrapper">
     <div className='logoContent'><img src={logo} className='logoImg' alt='logoImg'></img><div className='logoText'><Link to="/" style={{ textDecoration: 'none' }}>Redux bar</Link></div></div>
        <Link className='cart' to="/cart" style={{ textDecoration: 'none' }}><img src={cartImg} className='cartImg' alt='cart'></img> <div className='cartCount'>{Cart.length}</div></Link>
    </div>
  );
}

export default Header;
