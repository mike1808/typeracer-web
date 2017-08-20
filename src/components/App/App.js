import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Header from '../Header/Header';
import './App.css';

const App = () => (
    <Router>
        <div className="App">
            <Header />

            <div className="App-container">
                <Route exact path="/" component={Home} />
            </div>
        </div>
    </Router>
);

export default App;
