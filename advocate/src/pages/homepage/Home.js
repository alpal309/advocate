import React from 'react';
import logo from '../../assets/advocate.png'
import Modal from './components/Modal'
import Dashboard from "../dashboard/Dashboard";
import {Redirect, Route} from "react-router";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalState:{
                displayed: false,
                contentType: "",
            },
            loggedIn: false
        };
        this.handleModal = this.handleModal.bind(this);
        this.exitModal = this.exitModal.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    handleModal = (vis, formType) => {
        this.setState({modalState: {displayed: vis, contentType: formType}});
    };

    exitModal = (event) => {
        if (this.state.modalState.displayed && event.target.closest(".formmodal") === null && event.target.closest(".promptcontainer") === null)
            this.handleModal(false, "");
    };

    logIn = () => {
        this.setState({loggedIn: true})
    };

    render() {
        return (
            this.state.loggedIn
                ? <Redirect push to={"/dashboard/main"}/>
                : (<div className={"herocontainer"} onClick={this.exitModal}>
                    <Modal modalProps={{modalState: this.state.modalState, callback: this.logIn}}/>
                    <header className={"homeheader"}>
                    <img src={logo}/>
                    <div className={"promptcontainer"}>
                        <div onClick={() => {this.handleModal(true, "login")}} className={"headerlogin i-hover"}>
                            <i className={"fas fa-user i-right"}/>
                            <span>Login</span>
                        </div>
                        <div onClick={() => {this.handleModal(true, "register")}} className={"headerregister i-hover"}>
                            <i className={"fas fa-user-plus i-right"}/>
                            <span>Register</span>
                        </div>
                    </div>
                </header>
                    <div className={"herotext"}>
                    <h3>Advocate through data.</h3>
                    <h2>Spend less time with data collection and more time impacting lives.</h2>
                    <br/>
                    <p><i className={"far fa-chart-bar i-right"}/> Visualize student growth</p>
                    <p><i className={"fas fa-sync-alt i-right"}/> Create templates to reuse goals</p>
                    <p><i className={"fas fa-users i-right"}/>Manage your classroom</p>
                    <p><i className={"fas fa-network-wired i-right"}/>Multiple methods to track progress</p>
                </div>
                  </div>)
        );
    }
}

export default Home;
