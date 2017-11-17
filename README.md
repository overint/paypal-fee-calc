# PayPal Fee Calculator

Advanced fee calculator for PayPal payments - built with React

## Screenshot

![Screenshot](https://raw.githubusercontent.com/overint/paypal-fee-calc/master/screenshot.png)

## Features

 - Rates for a many regions (as well as custom fee %s)
 - Support for all currencies PayPal supports (including fixed fees) 
 - Support for currency conversion (and associated fees)
 - Calculate base on how much you want to receive, or how much you will receive

### Currency Conversion

Rates are sourced from `fixer.io` which provides an API for the foreign exchange rates published by the European 
Central Bank.  
The rates are updated daily around 4PM CET every working day.

### Fees

The fees are currently hard-coded, however if you notice that they are out of date, or you wish to add support for 
your country please submit a [Pull Request](https://github.com/overint/paypal-fee-calc/pulls).
