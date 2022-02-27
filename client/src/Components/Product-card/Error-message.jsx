import React from 'react';

const ErrorMessage = ({ textError }) => {
    return (
        <div>
            <div>
                <p className="added-text-error-1">{textError}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;