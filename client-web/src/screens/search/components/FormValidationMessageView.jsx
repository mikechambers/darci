import React from "react";

const FormValidationMessageView = (props) => {
    const messages = props.messages;

    return (
        <div>
            {messages.map((msg, index) => {
                return (
                    <div key={index} className="form_validation_msg">
                        {msg}
                    </div>
                );
            })}
        </div>
    );
};

export default FormValidationMessageView;
