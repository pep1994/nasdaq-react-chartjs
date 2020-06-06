import React, { Component } from 'react'

 class StockName extends Component {
     constructor(props){
         super(props);
     }

     clickHandler = () => {

        this.props.addPreferiti(this.props.id);
     }
    render() {
        return (
            <div className="stockname" onClick = {this.clickHandler}>
               <i className="fas fa-plus-circle"></i> {this.props.dati.symbol} - {this.props.dati.name}
            </div>
        )
    }
}

export default StockName
