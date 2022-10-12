import React, { Component } from 'react';
import './NavBar.css';
import logo from './logo/logo-01.svg';
import Cart from './Cart';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartExpanded: false
    };
    this.toggleCart = this.toggleCart.bind(this);
  }

  toggleCart() {
    this.setState({
      isCartExpanded: !this.state.isCartExpanded
    })
  }

  render() {
    let cartClass = 'cart cart-rolls';
    if (this.state.isCartExpanded) {
      cartClass += ' expanded';
    }

    return (
      <div>
        <header>
          <img className="logo" src={logo} alt="logo of the bun bun bake shop which is a doodle of a cinammon roll"/>
          <div className="navbar">
            <div>
              <a >PRODUCTS </a>
              <a className="navbar-cart" onClick={this.toggleCart}>CART</a>
            </div>
            <hr/>
            <p className="tagline">Our hand-made cinnamon rolls</p>    
          </div>
        </header>
        <Cart
          className= {cartClass}
          totalPrice= {this.props.totalPrice}
          cart= {this.props.cart}
          rollData= {this.props.rollData}
          removeFromCart= {this.props.removeFromCart}
        />
        
      </div>
    );
  }
}

export default NavBar;