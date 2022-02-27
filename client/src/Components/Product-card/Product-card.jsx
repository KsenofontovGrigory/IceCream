import React, {useEffect, useState} from 'react';

import {Link, useParams} from "react-router-dom";
import axios from "axios";

import Product from "./Product";
import './Product-card.scss';

const ProductCard = () => {

    const [product, setProduct] = useState(null);

    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="container-product-card">
            <div className="container">
                <div className="product-card">
                    <div className="bread-crumbs">
                        <Link to={"/"}><span>Main page /</span></Link>
                        <span>Product card</span>
                    </div>
                    <Product
                        userId={id}
                        product={product}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;