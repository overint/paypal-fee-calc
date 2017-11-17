import React from 'react';

import Header from './Header';
import Options from "./Options";
import Results from "./Results";

import CurrencyConversion from "../http/CurrencyConversion"
import fees from '../data/fees'

// PayPal adds ~2.5% on top of the market exchange rates when converting currencies.
const INTL_FEE = 2.5;

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: null,
            results: null,
            loading: false,
            feeFixed: 0.30,
            feePercent: 2.9,
            customFee: false,
            currencyFrom: "USD",
            currencyTo: "USD",
            rate: 1
        };

        this.updateAmount = this.updateAmount.bind(this);
        this.updateFromCurrency = this.updateFromCurrency.bind(this);
        this.updateToCurrency = this.updateToCurrency.bind(this);
        this.updateCustomPercent = this.updateCustomPercent.bind(this);
        this.updateSelectedCountry = this.updateSelectedCountry.bind(this);
    }

    askFee(amount, feePercent, feeFixed, needsConversion) {
        feePercent = needsConversion ? feePercent + INTL_FEE : feePercent;
        let r = amount * (feePercent / 100) + feeFixed;
        let i = amount - r;
        return {
            fee: r.toFixed(2),
            value: i.toFixed(2)
        }
    }

    wantFee(amount, feePercent, feeFixed, needsConversion) {
        feePercent = needsConversion ? feePercent + INTL_FEE : feePercent;
        let r = (100 - feePercent) / 100;
        let i = (amount + feeFixed) / r;
        let s = i - amount;
        return {
            fee: s.toFixed(2),
            value: i.toFixed(2)
        }
    }

    calculateFees(amount) {
        if (!amount) {
            return;
        }

        let rate = this.state.rate;
        let needsConversion = rate !== 1;


        let fees = {
            ask: this.askFee(amount, this.state.feePercent, this.state.feeFixed / rate, needsConversion),
            want: this.wantFee(amount, this.state.feePercent, this.state.feeFixed, needsConversion)
        };

        if (rate !== 1) {
            fees.ask.raw = fees.ask.fee;
            fees.want.raw = (fees.want.fee / rate).toFixed(2);
            fees.ask.value = (fees.ask.value * rate).toFixed(2);
            fees.ask.fee = (fees.ask.fee * rate).toFixed(2);
            fees.want.value = (fees.want.value / rate).toFixed(2);
        }
        return fees;
    }

    updateSelectedCountry(event) {
        this.updateThenCalculate({
            feePercent: event.value
        });
        this.setState({
            customFee: false
        });
    }

    updateFromCurrency(event) {
        this.setState({
            currencyFrom: event.value
        });
        this.refreshRates(event.value, this.state.currencyTo)
    }

    updateToCurrency(event) {
        this.setState({
            currencyTo: event.value,
            feeFixed: fees.fixed[event.value]
        });
        this.refreshRates(this.state.currencyFrom, event.value)
    }

    refreshRates(from, to) {
        this.setState({
            loading: true
        });

        CurrencyConversion.rates(from, to).then((rate) => {
            this.updateThenCalculate({
                rate,
                loading: false
            });
        });
    }

    updateThenCalculate(newState) {
        new Promise((resolve) => {
            resolve(this.setState(newState));
        }).then(() => {
            this.setState({
                results: this.calculateFees(this.state.amount)
            });
        });
    }

    updateCustomPercent(event) {
        let val = event.target.value ? event.target.value : 0;

        if (val < 0 || val > 15)
        {
            this.setState({
                feePercent: this.state.feePercent
            });
            return;
        }

        this.updateThenCalculate({
            feePercent: parseFloat(val),
            customFee: true
        });
    }

    updateAmount(event) {
        let amount = parseFloat(event.target.value);

        if (!amount || amount <= 0) {
            this.setState({
                amount: null,
                results: null
            });
            return;
        }

        this.setState({
            amount,
            results: this.calculateFees(amount)
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <Header
                        updateAmount={this.updateAmount}
                        feePercent={this.state.feePercent}
                        feeFixed={this.state.feeFixed}
                        currencyTo={this.state.currencyTo}
                        fxFee={this.state.rate !== 1}
                    />

                    <Options
                        updateSelectedCountry={this.updateSelectedCountry}
                        updateCustomPercent={this.updateCustomPercent}
                        updateFromCurrency={this.updateFromCurrency}
                        updateToCurrency={this.updateToCurrency}
                        feePercent={this.state.feePercent}
                        customFee={this.state.customFee}
                        feeFixed={this.state.feeFixed}
                        currencyTo={this.state.currencyTo}
                        currencyFrom={this.state.currencyFrom}
                    />

                    <Results
                        currencyTo={this.state.currencyTo}
                        currencyFrom={this.state.currencyFrom}
                        results={this.state.results}
                        loading={this.state.loading}
                        amount={this.state.amount}
                        fxFee={this.state.rate !== 1}
                    />
                </div>
            </div>
        );
    }
}

export default Calculator;