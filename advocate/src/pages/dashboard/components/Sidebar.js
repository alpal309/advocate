import React from "react";
import '../../../css/dashboardstyles.css';
import puzzle from '../../../assets/puzzle.png';
import SidebarLinks from "./SidebarLinks";
import SidebarProfile from "./SidebarProfile";
import {Link} from "react-router-dom";

class Sidebar extends React.Component{
    constructor(props) {
        super(props);
        let path = window.location.pathname.split("/")[2].toUpperCase();
        this.state = {current: path};
    }

    handleChange = (e) => {
        this.setState({current: (e.replace(" ", ""))});
    };


    render(){
        return(
            <div className={"sidebarwrapper"}>
                <div className={"sidebar"}>
                    <div className={"sidebarheader sidebarpad"}>
                        <Link to={"/"}><img src={puzzle} alt={"logo"}/></Link>
                    </div>
                    <div className={"sidebarmain sidebarpad sideflex"}>
                        <SidebarLinks updateActiveLink={this.handleChange} activeLink={this.state.current}/>
                    </div>
                    <SidebarProfile updateActiveLink={this.handleChange} isActive={this.state.current === "PROFILE"}/>
                </div>
            </div>
        )
    }
}

export default Sidebar;