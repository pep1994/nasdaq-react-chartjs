import React, { Component } from 'react';
import '../../css/stock/stock.css'
import Chart from '../chart'
class Stock extends Component {

    constructor(props) {
        super(props);

        this.symbol = this.props.dati.symbol;
        this.price = this.props.dati.price;

        this.state = { 
            symbol: this.symbol,
            price: this.price,
            dataTrade: 'xxxx-xx-xx 16:00:00',
            ckReal: "",
            showError: false,
            errorMsg: null,
            chartLabels: ['16:00:00'],
            chartPrice: [this.price],
            showChart: false
            }
         
    
    }

    static getDerivedStateFromProps(np, ps) {
        if (np.dati.symbol !== ps.symbol) {
            return { nome: np.dati.symbol, valore: np.dati.price }
        }
        return null;
    }


    getLiveTranding = () => {

        
          const apiKey = 'PADtqhs2BDYQIRYqTRFljeWe3H4UcAMIFUDZBqS09XLiVEn8BQ2IxEiHBuIe';
    
          const url = `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${this.symbol}&api_token=${apiKey}`;
    
          fetch(url)
            .then(res => res.json())
            .then(data => {
              console.log(data);

              let price = Object.keys(data.intraday)[0];
              console.log(price)
              let dataTrade = Object.values(data.intraday)[0].open;
              console.log(dataTrade)

            

              this.setState({
                  price: price,
                  dataTrade: dataTrade,
                  chartLabels: [...this.state.chartLabels, dataTrade.substring(11, dataTrade.length)],
                  chartPrice: [...this.state.chartPrice, price]
              })
              
            })
            .catch(err => {
              console.log(err);
              this.setState({
                showError: true,
                errorMsg: err.message
              })

              this.stopTranding();
              
            })
        
      }

      startTranding = () => {
          this.timer = setInterval( () => {
            this.getLiveTranding();
            console.log('ciao');
            
          }, 2000)
      }

      stopTranding = () => {
          clearInterval(this.timer);
      }

      componentWillUnmount() {
        clearInterval(this.timer);
      }


    clickHandler = ()=> {
        this.props.removeStock(this.props.id);
    }

    changeHandler = () => {


        let check = this.state.ckReal === 'checked' ? "" : 'checked';

        if (check === 'checked') {
            
            this.startTranding();

        } else {

             this.stopTranding();
        }

        this.setState({
            ckReal: check,
            showError: false
        })

    }

    showChart = ()=>{
        this.setState({
            showChart: !this.state.showChart
        })
    }

    render() {
        const diff = (this.state.price - this.price).toFixed(2);
        const perc = (diff / this.price) * 100;
        return (
            <div className="stock col-md-6 p-3">
                <div className="bodystock">
                    <i className="fas fa-times-circle closebtn" onClick = {this.clickHandler}></i>
                    <div className="row">
                        <div className="col-sm">
                            <h2 className = "yellow">{this.symbol}</h2>
                            <p>Nasdaq</p>
                        </div>
                        <div className="col-sm">
                            <h2>{this.state.price}</h2>
                            <p>{this.state.dataTrade.substring(11, this.state.dataTrade.length)}</p>
                        </div>
                        <div className="col-sm">
                            <h2>{diff}</h2>
                            <p style = {{color: 'green'}}>{perc.toFixed(1)} %</p>
                        </div>
                        <div className="col-sm">
                            <p><i onClick = {this.showChart} style = {{cursor: 'pointer'}} className = "fas fa-chart-line fa-2x"></i></p>
                            <label className="bs-switch">
                                <input type="checkbox" onChange = {this.changeHandler} checked={this.state.ckReal}/> <span className="slider round"></span>
                            </label>
                            {
                                this.state.showError && <span style = {{color: 'red'}} className="text-center">{this.state.errorMsg}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="bodygrafico">
                    <div className="row">
                        <div className="col-sm">
                            { this.state.showChart && <Chart dataLabels={this.state.chartLabels} dataPrice={this.state.chartPrice}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Stock
