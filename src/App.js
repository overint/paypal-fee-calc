import React from 'react';
import './css/App.css';
import './css/bootstrap/bootstrap.min.css';
import 'react-select/dist/react-select.css';

import Calculator from "./components/Calculator";

class App extends React.Component {
    render() {
        return (
            <div className="container" style={{paddingTop: 100}}>
                <Calculator/>
            </div>
        );
    }
}

export default App;
