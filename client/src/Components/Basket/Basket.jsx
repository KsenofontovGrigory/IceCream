import React, {useContext} from 'react';

import BasketCard from "./Basket-card";
import {Link, Navigate} from "react-router-dom";

import './Basket.scss'
import SubTotal from "./Sub-total";
import {MyContext} from "../../App";

const Basket = () => {

    const { basket, loginCondition } = useContext(MyContext)

    if(!loginCondition) {
        return <Navigate to="/" />
    }

    return (
        <div className="container-basket">
            <div className="container">
                <div className="bread-crumbs">
                    <Link to="/"><span>Main page /</span></Link>
                    <span>Basket</span>
                </div>
                <p className="table-of-content">Basket</p>
                <div className="container-content-basket">
                    <div>
                        {basket.length > 0
                            ? basket.map((item) => (
                                <BasketCard
                                    key={item._id}
                                    cart={item}
                                />
                            ))
                        : <p className="empty-basket">Basket is empty</p>}
                    </div>
                    <SubTotal cart={basket.map(item => (
                        item.cost * item.count
                    ))} />
                </div>

            </div>
        </div>
    );
};

export default Basket;