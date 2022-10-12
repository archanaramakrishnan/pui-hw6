import React, { Component } from 'react';
import '../../NavBar.css';
import './index.css';
import original from '../../products/original-cinnamon-roll.jpg';
import apple from '../../products/apple-cinnamon-roll.jpg';
import raisin from '../../products/raisin-cinnamon-roll.jpg';
import walnut from '../../products/walnut-cinnamon-roll.jpg';
import chocolate from '../../products/double-chocolate-cinnamon-roll.jpg';
import strawberry from '../../products/strawberry-cinnamon-roll.jpg';

import Roll from '../../Roll.js';
import NavBar from '../../NavBar.js';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartTotalPrice: 0,
      currentRoll: {},
      searchTerm: "",
      sortTerm: "name",
      rollData: [
        {
          name: "Original cinammon roll",
          price: 2.49,
          imageURL: original,
          index: 0
        },
        {
          name: "Apple cinammon roll",
          price: 3.49,
          imageURL: apple,
          index: 1
        },
        {
          name: "Raisin cinammon roll",
          price: 2.99,
          imageURL: raisin,
          index: 2
        },
        {
          name: "Walnut cinammon roll",
          price: 3.49,
          imageURL: walnut,
          index: 3
        },
        {
          name: "Double-chocolate cinammon roll",
          price: 3.99,
          imageURL: chocolate,
          index: 4
        },
        {
          name: "Strawberry cinammon roll",
          price: 3.99,
          imageURL: strawberry,
          index: 5
        }
      ]
    };

    this.handleSortChange = this.handleSortChange.bind(this);
  }

  showCart = (rollIndex, rollName, glazing, packSize, totalPrice) => {
    const roll = {
      name: rollName,
      glaze: glazing, 
      pack: packSize,
      price: totalPrice,
      imageURL: this.state.rollData[rollIndex].imageURL,
      index: this.state.cart.length
    }
    console.log("this.state.cart", this.state.cart)
    this.setState(prevState => ({
      ...prevState,
      cartTotalPrice: prevState.cartTotalPrice + Number(roll.price),
      cart: [...prevState.cart, roll],
      currentRoll: roll
    }));
  }

  handleSortChange = (event) => {
    const selectedSort = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      sortTerm: selectedSort
    }));
    //flipped keys because react has a delay in state change
    if(this.state.sortTerm === "price")
    {
      this.state.rollData.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    else if(this.state.sortTerm === "name") {
      this.state.rollData.sort((a, b) => a.price > b.price ? 1 : -1);
    }
    
  };

  removeFromCart = (deleteIndex) => {
    console.log("CURRENTLY BEING DELETED: ", deleteIndex)
    console.log("this.state.cart", this.state.cart)
    this.setState(prevState => ({     
      ...prevState,	
      cart: (this.state.cart.length === 1 ) ? [] : prevState.cart.filter(roll => roll !== this.state.cart[deleteIndex]),
      cartTotalPrice: (this.state.cart.length === 1 ) ? 0 : prevState.cartTotalPrice - this.state.cart[deleteIndex].price
    }))
    console.log("this.state.cart", this.state.cart)
    this.state.cart.map((roll) => roll.index > deleteIndex ? roll.index = roll.index-1 : roll.index = roll.index);

  }

  handleSearch = () => {
    let input = document.getElementById("userInput").value;
    this.setState(prevState => ({
      ...prevState,
      searchTerm: input
    }))
  }

  render() {
    return (
      <div className="App">
          <NavBar
            totalPrice= {this.state.cartTotalPrice.toFixed(2)}
            cart= {this.state.cart}
            rollData= {this.state.rollData}
            removeFromCart= {this.removeFromCart}
          />
          <div id="textbox">
            <div className="search align-left">
              <input type="text" id="userInput"/>
              <button onClick={this.handleSearch}>Search</button>
            </div>
            <div className="options align-right">
            <p></p>Sort by:<select name="sort" value={this.state.sortTerm} onChange={this.handleSortChange}>
                <option value="name">Name</option>
                <option value="price">Base Price</option>
              </select>
            </div>
          </div>
          <br></br>
        
        
                  
        <div className="list">
          
          {this.state.rollData.map(
            (roll, index) => {
              if ((this.state.searchTerm === "") || (roll.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))) {
                return <div>
                  <Roll
                  rollIndex={index}
                  imageURL={roll.imageURL}
                  rollName={roll.name} 
                  price={roll.price}
                  addToCart={this.showCart}/>
                </div>
              } 
              else {
                return <div></div>
              }
            }
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;