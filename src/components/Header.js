import React from 'react';

function Header(props) {
    return (
        <div className="panel panel-default">
            <div className="panel-heading text-center">
                <h4>PayPal Fee Calculator</h4>
            </div>
            <div className="panel-body">
                <div className="form-group col-md-6">
                    <input type="number" className="form-control" placeholder="Amount in $"
                           onChange={props.updateAmount}/>
                </div>
                <div className="form-group col-md-6">
                    <input type="number" className="form-control text-center" readOnly
                           placeholder={`${props.feePercent}% + ${props.fxFee ? '2.5% +': ''} ${props.feeFixed} ${props.currencyTo}`}/>
                </div>
            </div>
        </div>
    )
}

export default Header;