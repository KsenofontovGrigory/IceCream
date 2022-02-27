import React from 'react';

const SubTotal = ({ cart }) => {

    return (
        <div className="sub-total">
            <div>
                <p>Sub total</p>
                <p>${cart.length && cart.reduce((a,b) => a + b) }.00</p>
            </div>
            <div>
                <button>Check out</button>
            </div>
        </div>
    );
};

export default SubTotal;