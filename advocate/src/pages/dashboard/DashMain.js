import React from "react";
import GetStarted from "./components/GetStarted";
import ProfileCard from "./components/ProfileCard";
import Table from "./components/Table";

class DashMain extends React.Component{
    teacher = this.props.teacher;

    createClass = () => {
        return (
            <div className={"card width-100"}>
                <GetStarted to={"/dashboard/classroom/create"} navHandler={{updateActiveCategory: this.props.navHandler.updateActiveCategory}}>
                    <i className="fas fa-plus marg-bot"/>
                    <h2>Get started by creating a classroom</h2>
                </GetStarted>
            </div>
        )
    };


    render(){
        return(
            <div className={"dash-main-inner"}>
                <div className={"cardwrapperrow"}>
                    <ProfileCard teacher={this.teacher}/>
                    {(this.teacher.classrooms.length === 0 && this.createClass())
                    || <div className={"card width-100"}><div className={"cardheader"}><h2>{this.teacher.classrooms[0].className}</h2></div><Table studentTable={true} data={this.teacher.classrooms[0].students}/></div>}
                </div>
            </div>
        )
    }
}

export default DashMain;