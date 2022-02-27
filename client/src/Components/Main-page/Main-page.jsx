import React, {useContext} from 'react';

import Card from "./Card";
import './Main-page.scss';
import loveIceCream from '../../images/loveIceCream.png';
import {MyContext} from "../../App";

const MainPage = () => {

    const { products } = useContext(MyContext)

    return (
        <div className="container-content">
            <div className="container">
                <div className="logo-ice-cream">
                    <img src={loveIceCream} alt="text"/>
                </div>
                <div className="cards-container">
                    {products.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;