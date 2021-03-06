import React from "react";
import {FaCheck as CheckIcon, FaTimes as XIcon} from "react-icons/fa";
import Button from "components/atoms/Button";

/*
    props:
        confirmCallback: function- the confirm function when confirm is clicked
        cancelCallback: function- the callback function when cancel is clicked
        confirmText: string: optional- text for the confirm button
        cancelText: string: optional- text for the cancel button
*/

const ConfirmOrCancelButtons = ({confirmCallback, cancelCallback, confirmText, cancelText, isLoading}) => {
    const onEnterConfirm = (e) => {
        if(e.key === "Enter")
            confirmCallback();
    };

    const onEnterCancel = (e) => {
        if(e.key === "Enter")
            cancelCallback();
    };

    return (
        <div>
            <Button
                className={"marg-right"}
                onClick={confirmCallback}
                onKeyPress={onEnterConfirm}
                icon={<CheckIcon/>}
                text={confirmText || "Confirm"}
                isLoading={isLoading}
            />
            <Button
                className={"cancelButton"}
                onClick={cancelCallback}
                onKeyPress={onEnterCancel}
                icon={<XIcon/>}
                text={cancelText || "Cancel"}
            />
        </div>
    )
};

export default ConfirmOrCancelButtons;