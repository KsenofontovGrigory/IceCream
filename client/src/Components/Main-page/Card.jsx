import React from 'react';

import {Link} from "react-router-dom";

const Card = ({card}) => {
    return (
        <div className="card">
            <Link to={`/products/${card._id}`}>
                <div>
                    <img src={require(`../../${card.img}`)} alt="text"/>
                </div>
                <div>
                    <p>{card.name}</p>
                    <p>${card.cost}.00</p>
                </div>
            </Link>
        </div>
    );
};

export default Card;