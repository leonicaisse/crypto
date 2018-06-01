import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import {VictoryBar, VictoryChart, VictoryTheme, VictoryLine} from 'victory';

import Components from "./Components.js";

class App extends Component {
    data = [];

    constructor(props) {
        super(props);

        this.state = {
            cryptos: [],
            histo: [],
            histolim: 6,
            fsyms: 'BTC,ETH,BCH,EOS,XRP',
            tsyms: 'EUR',
            fsym: 'BTC',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + this.state.fsyms + '&tsyms=' + this.state.tsyms)
                .then(res => {
                    const cryptos = res.data.RAW;
                    console.log(cryptos);
                    this.setState({cryptos: cryptos});
                })
            axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=' + this.state.fsyms + '&tsym=' + this.state.tsyms + '&limit=' + this.state.histolim)
                .then(res => {
                    const histo = res.data.Data;
                    console.log('issou', histo);
                    this.setState({histo: histo});
                })
        }, 1000)

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    pushData(key, i) {
        this.data.push({x: i, y: this.state.histo[i].high})
    }

    resetData() {
        this.data.length = 0
    }

    render() {
        return (
            <div className="App">
                <div id="selector">
                    <select name="fsyms" onChange={this.handleChange}>
                        <option value='BTC,ETH,BCH,EOS,XRP'>All</option>
                        <option value='BTC'>BTC</option>
                        <option value='ETH'>ETH</option>
                        <option value='BCH'>BCH</option>
                        <option value='EOS'>EOS</option>
                        <option value='XRP'>XRP</option>
                    </select>
                </div>
                {
                    Object.keys(this.state.cryptos).map((key, i) => (
                            <Components crypto_key={i} crypto_name={key} crypto_price={this.state.cryptos[key].EUR.PRICE}
                                        crypto_change={this.state.cryptos[key].EUR.CHANGEPCT24HOUR}/>
                        )
                    )
                }
                {
                    this.resetData()
                }
                {

                    Object.keys(this.state.histo).map((key, i) => (
                            this.pushData(key, i)
                        )
                    )
                }
                <VictoryChart
                    theme={VictoryTheme.grayscale}
                >
                    <VictoryLine
                        style={{
                            data: {stroke: "#c43a31"},
                            parent: {border: "1px solid #ccc"}
                        }}

                        data={this.data}
                        y0={() => 0}
                    />
                </VictoryChart>
            </div>
        );
    }

}

export default App;
