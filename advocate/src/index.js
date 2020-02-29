import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from "react-router-dom";
import ru from './css/reusable.css';
import st from './css/styles.css';
import bp from './css/breakpoints.css';

ReactDOM.render(
    <Router>
        <Route path="/" component={App}/>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();