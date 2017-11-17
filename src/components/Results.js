import React from 'react';

function Results(props) {
    return (
        <div
            className={`panel panel-default`}>
            <div className="panel-body">
                {props.results && !props.loading &&
                <div>
                    <div className="col-md-6">
                        <p>If you ask for
                            <strong> {props.amount} {props.currencyFrom}</strong>, you'll
                            receive
                        </p>
                        <h4><strong>{props.results.ask.value} {props.currencyTo}</strong>
                        </h4>
                        <p>PayPal will take
                            <strong> {props.results.ask.fee} {props.currencyTo}</strong>
                            {props.fxFee && ` (${props.results.ask.raw}  ${props.currencyFrom})`}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p>If you want
                            <strong> {props.amount} {props.currencyTo}</strong>, you
                            should ask for
                        </p>
                        <h4>
                            <strong>{props.results.want.value} {props.currencyFrom}</strong>
                        </h4>
                        <p>PayPal will take
                            <strong> {props.results.want.fee} {props.currencyTo}</strong>
                            {props.fxFee && ` (${props.results.want.raw}  ${props.currencyFrom})`}
                        </p>
                    </div>
                </div>}
                {props.loading && props.results &&
                <div className="text-center">
                    <h4>Loading Conversion Rates</h4>
                </div>
                }
                {!props.results &&
                <div className="text-center">
                    <h4>Enter an amount to calculate fees</h4>
                </div>}
            </div>
        </div>
    )
}

export default Results;