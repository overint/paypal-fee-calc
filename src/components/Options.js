import React from 'react';
import Select from 'react-select';

import fees from '../data/fees'
import currency from '../data/currency'

function Options(props) {
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div>
                    <div className="row">
                        <div className="form-group col-md-7">
                            <label>Select your Country</label>
                            <Select
                                clearable={false}
                                placeholder={`Using a custom fee of ${props.feePercent}%`}
                                onChange={props.updateSelectedCountry}
                                value={props.feePercent}
                                options={fees.countries}
                            />
                        </div>
                        <div className="col-md-1 text-center">
                            <br />
                            <h4><strong>Or</strong></h4>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Custom Percentage Fee</label>
                            <input type="number" min="1" max="10" step ="0.01" className="form-control" placeholder="2.9%"
                                   onChange={props.updateCustomPercent} value={props.customFee ? props.feePercent : ''} style={{height: 36}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Currency From</label>
                            <Select
                                clearable={false}
                                onChange={props.updateFromCurrency}
                                value={props.currencyFrom}
                                options={currency.symbols}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Currency To</label>
                            <Select
                                clearable={false}
                                onChange={props.updateToCurrency}
                                value={props.currencyTo}
                                options={currency.symbols}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Options;