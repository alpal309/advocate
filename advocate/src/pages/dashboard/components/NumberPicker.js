import React from "react";
import {FaPlus as PlusIcon, FaMinus as MinusIcon} from "react-icons/fa";

const NumberPicker = (props) => {
    let num = props.objectArray.length;
    let limit = props.limit || 100;

    const change = (num, object, objArr) => {
        let newObjArr = JSON.parse(JSON.stringify(objArr));
        let x = parseInt(num) || 0;
        x = (x > limit ? limit : x);

        let cur = newObjArr.length;
        if (x > cur) {
            while(cur !== x){
                newObjArr.push(object);
                cur++;
            }
        }
        else if (x < cur)
            while(cur !== x){
                newObjArr.pop();
                cur--;
            }
        return newObjArr;
    };

    return (
        <div className={"numberpickerwrapper"}>
            <div className={`numbersub ${num === 0 ? 'disabled' : ''}`} onClick={(e)=>{
                props.updateState(change(num-1, props.object, props.objectArray));
                }}
            ><MinusIcon className={"posabs"}/></div>
            <div className={"numberinput"}><input placeholder={num} value={num} onChange={(e)=>{
                props.updateState(change(e.currentTarget.value, props.object, props.objectArray));
            }} type={"text"}/></div>
            <div className={`numberadd ${num === limit ? 'disabled' : ''}`} onClick={(e)=>{
                props.updateState(change(num+1, props.object, props.objectArray));
            }}><PlusIcon className={"posabs"}/></div>
        </div>
    )
};


export default NumberPicker;