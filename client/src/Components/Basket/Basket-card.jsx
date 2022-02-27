import React, {useContext} from 'react';

import axios from "axios";

import close from "../../images/delete.png";
import {MyContext} from "../../App";

const BasketCard = ({cart}) => {

    const {
        token,
        userId,
        setBasket,
        basket
    } = useContext(MyContext)

    const deleteProduct = () => {
        const newBasket = basket.filter((item) => {
            if (item._id !== cart._id) {
                return basket
            }
        })
        axios.delete(`http://localhost:5000/api/basket/${userId}`, {
            headers: {
                'Authorization': token
            }
        })
            .then(() => {
                setBasket(newBasket)
            })
            .catch(() => {
                return "error"
            })
    }

    return (
        <div>
            <div className="card-in-basket">
                <div className="one-product">
                    <div className="image-basket">
                        <img src={require(`../../${cart.img}`)} alt="text"/>
                    </div>
                    <div className="description-ice-cream">
                        <p className="name-ice-cream">{cart.name}</p>
                        <p className="number-ice-cream">{cart.count} pcs.</p>
                    </div>
                </div>
                <div className="sum">
                    <p>${cart.cost}.00</p>
                    <img onClick={deleteProduct} src={close} alt="text"/>
                </div>
            </div>
        </div>
    );
};

export default BasketCard;