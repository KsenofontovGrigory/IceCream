import React from 'react';

import ok from "../../images/ok.png";

const AcceptMessage = ( ) => {
    return (
        <div>
            <div>
                <img src={ok} alt="text"/>
                <p className="added-text">Added to cart</p>
            </div>
        </div>
    );
};

export default AcceptMessage;