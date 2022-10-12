import React, { Component } from 'react';
import './Roll.css';

class Roll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rollName: this.props.rollName,
      price: this.props.price,
      glazing: "Keep original",
      packSize: 1,
      glazingPriceList: { 
        "Keep original" : 0.00,
        "Sugar milk" : 0.00,
        "Vanilla milk" : 0.50,
        "Double chocolate" : 1.50
      },
      packPriceList: {
        1 : 1,
        3 : 3,
        6 : 5,
        12 : 10
      }
      // isPackSizePressed: {
      //   1 : false,
      //   3 : false,
      //   6 : false,
      //   12 : false
      // }
    };
    this.state.name = this.props.rollName;
    this.state.price = this.props.price;
    this.handleGlazingChange = this.handleGlazingChange.bind(this);
    this.handlePackSizeChange = this.handlePackSizeChange.bind(this); 
  }

  handlePackSizeChange = (event) => {
    const selectedPackSize = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      packSize: selectedPackSize,
      //TODO: come back to 2.2 conditional styling
      // Updating an object with setState in React: https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
      // isPackSizePressed: {
      //   ...prevState.isPackSizePressed,
      //   selectedPackSize: true
      // }
    }));
  };

  handleGlazingChange = (event) => {
    const selectedGlazing = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      glazing: selectedGlazing
    }));
  };

  calculatePrice = () => {
    let rollPrice = this.props.price;
    let glazePrice = this.state.glazingPriceList[this.state.glazing];
    let packPrice = this.state.packPriceList[this.state.packSize];
    return ((rollPrice + glazePrice) * packPrice).toFixed(2);
  }

  render() {
    return (
      <div className="cinnamon-roll">         
        <img src={this.props.imageURL} className="roll-picture" alt={`a ${this.props.rollName} ${this.props.imageURL}`} />
        <b> {this.props.rollName} </b>
  
        <div className="options-box">
            <p className="options-label">Glazing:</p>
            
            <div className="options">
              <select name="glazing" value={this.state.glazing} onChange={this.handleGlazingChange}>
                <option value="Keep original">Keep original</option>
                <option value="Sugar milk">Sugar milk</option>
                <option value="Vanilla milk">Vanilla milk</option>
                <option value="Double chocolate">Double chocolate</option>
              </select>
            </div>
        </div>
  
        <div className="options-box">
          <p className="options-label">Pack size: </p>
          <div className="options">
            {/* Conditional inline styling reference: https://stackoverflow.com/questions/35762351/correct-way-to-handle-conditional-styling-in-react */}

            <input type="radio" id={`size1-${this.props.rollIndex}`} className="size" value={1} onChange={this.handlePackSizeChange} name= {this.props.rollName} /> 
            <label htmlFor={`size1-${this.props.rollIndex}`}><div className="size"> 1 </div></label>

            <input type="radio" id={`size3-${this.props.rollIndex}`} className="size" value={3} onChange={this.handlePackSizeChange}  name= {this.props.rollName} /> 
            <label htmlFor={`size3-${this.props.rollIndex}`}><div className="size"> 3 </div></label>

            <input type="radio" id={`size6-${this.props.rollIndex}`} className="size" value={6} onChange={this.handlePackSizeChange}  name= {this.props.rollName} /> 
            <label htmlFor={`size6-${this.props.rollIndex}`}><div className="size"> 6 </div></label>

            <input type="radio" id={`size12-${this.props.rollIndex}`} className="size" value={12} onChange={this.handlePackSizeChange}  name= {this.props.rollName} /> 
            <label htmlFor={`size12-${this.props.rollIndex}`}><div className="size"> 12 </div></label>
          </div>    
        </div> 
  
        <div className="options-box">
          <b className="options-label price-label">$ {this.calculatePrice()} </b>
          <div className="options">
            <button type="button" className="add-to-cart" onClick={() => this.props.addToCart(this.props.rollIndex, this.state.name, this.state.glazing, this.state.packSize, this.calculatePrice())}> Add to cart </button> 
          </div>
        </div>
      </div>
    );
  }
}

export default Roll;