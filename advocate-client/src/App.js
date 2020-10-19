import React, {useState} from 'react';
import Home from './components/pages/homepage/Home';
import Dashboard from './components/pages/dashboard/Dashboard';
import {Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";

const App = () => {
    const [teacher, updateTeacher] = useState();

    return (
        <div className="App">
            <Route render={({location}) => (
                <Switch location={location}>
                    <Route path="/" exact component={() => {
                        return <Home
                            teacher={teacher}
                            updateTeacher={updateTeacher}
                        />;
                    }}/>
                    <Route path="/dashboard/:page" component={() => {
                        return <Dashboard
                            teacher={teacher}
                            updateTeacher={updateTeacher}
                        />;
                    }}/>
                    <Redirect from={"/dashboard"} exact push to={"/dashboard/main"}/>
                </Switch>
            )}/>
        </div>
    );
}

export default App;
