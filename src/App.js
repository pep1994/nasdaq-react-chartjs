import React, { Component } from 'react'
import logo from './logo.png';
import './css/App.css';
import Stock from './components/stock/Stock';
import Search from './components/search';
import StockName from './components/stockname';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listaElementi: [],
      listaPreferiti: [],
      found: true,
      loading: false,
      showError: false,
      errorMsg: null
    }

  }


  getElements = val => {

    if (val.length > 0) {

      this.setState({
        loading: true,
        showError: false,
        found: true,
        listaPreferiti: []
      })

      const apiKey = 'PADtqhs2BDYQIRYqTRFljeWe3H4UcAMIFUDZBqS09XLiVEn8BQ2IxEiHBuIe';

      const url = `https://api.worldtradingdata.com/api/v1/stock_search?search_term=${val}&api_token=${apiKey}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);

          this.setState({
            listaElementi: data.data,
            loading: false
          })

          if (this.state.listaElementi < 1) {
            this.setState({
              found: false
            })
          } else {
            this.setState({
              found: true
            })
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            showError: true,
            errorMsg: err.message
          })

        })
    }

  }

  onValInput = val => {

    this.getElements(val)

  }

  onAddPreferiti = id => {

    this.setState({
      listaPreferiti: [...this.state.listaPreferiti, this.state.listaElementi[id]]
    })
  }

  onRemoveStock = id => {

    let newPrefer = this.state.listaPreferiti.filter((el, index) => {
      if (index == id) {
        return false;
      } else {
        return true;
      }
    })

    this.setState({
      listaPreferiti: newPrefer
    })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className = "yellow">
            Applicazione Stock Exchange
          </p>
          <Search onInputSearch={this.onValInput} />

          <div className="container">

            <section className="listanomi">
              <div className="row">
                <div className="col">
                  {this.state.loading && <p className="text-center">Caricamento in corso ...</p>}
                  {this.state.showError && <p className="text-center">{this.state.errorMsg}</p>}

                  {
                    this.state.found === false ?
                      <p>La ricerca non ha prodotto risultati</p> :
                      this.state.listaElementi.map((el, index) => <StockName key={el.symbol} dati={el} id={index} addPreferiti={this.onAddPreferiti} />)

                  }
                </div>
              </div>
            </section>

            <section className="listapreferiti row">


              {this.state.listaPreferiti.map((el, index) => <Stock key={el.symbol} dati={el} id = {index} removeStock = {this.onRemoveStock}/>)}


            </section>

          </div>
        </header>
      </div>

    )
  }
}

export default App

