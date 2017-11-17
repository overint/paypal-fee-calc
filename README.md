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

## Running the calculator
#### To run the calculator locally
 - Clone the repository to a location of your choice.
 - Run `yarn install` to install the required modules
 - Run `yarn start`. A new browser window will open after the code is compliled.
 
#### To run on a server (hosted)
 - Run `yarn build`. This will compile the static files & save them to the `/build` directory.
 - Upload these files to your server, and configure you web server to serve them as static files.
