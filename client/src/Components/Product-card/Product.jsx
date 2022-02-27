import React, {useContext, useState} from 'react';

import axios from "axios";

import lock from "../../images/lock.png";
import AcceptMessage from "./Accept-message";
import ErrorMessage from "./Error-message";
import {MyContext} from "../../App";
import spinner from "../../images/spinner.png"

const Product = ({ product }) => {

    const {
        token,
        userId,
        basket,
        setBasket,
        loginCondition,
        loginOpen
    } = useContext(MyContext)

    const [count, setCount] = useState(1);
    const [accept, setAccept] = useState(false);
    const [textError, setTextError] = useState('');
    const [buttonBasket, setButtonBasket] = useState("Add to basket");
    const [imageButton, setImageButton] = useState({lock});
    const [styleButton, setStyleButton] = useState("");

    const productsWithNum = {...product, count};
    const currentProductInBasket = basket.find((item) => item.productId === productsWithNum._id);

    const addToBasket = () => {
        if (basket.length === 3 && !basket.some((item) => productsWithNum._id === item.productId)) {
            setAccept(false)
            setTextError("Maximum number of positions selected")
        } else {
            if (currentProductInBasket && currentProductInBasket.count === 3) {
                setAccept(false)
                setTextError("The maximum quantity of this product has been selected")
            } else {
                if (currentProductInBasket && product._id === currentProductInBasket.productId) {
                    setButtonBasket("")
                    setImageButton({lock: spinner})
                    setStyleButton("rotate-image");
                    let currentCount
                    const newBasket = basket.map((item) => {
                        if (item.productId === productsWithNum._id) {
                            currentCount = Number(item.count)
                            return {...item, count: item.count + count}
                        }
                        return item
                    })
                    axios.patch(`http://localhost:5000/api/basket/${userId}`, {
                        ...currentProductInBasket,
                        count: currentCount + count,
                        id: currentProductInBasket._id
                    }, {
                        headers: {
                            'Authorization': token
                        }
                    })
                        .then(() => {
                            setButtonBasket("Add to basket")
                            setImageButton({lock: lock})
                            setStyleButton("");
                            setBasket(newBasket)
                            setAccept(true)
                            setTextError('')
                        })
                        .catch(() => {
                            return "error"
                        });
                } else {
                    setButtonBasket("")
                    setImageButton({lock: spinner})
                    setStyleButton("rotate-image");
                    axios.post(`http://localhost:5000/api/basket/${userId}`, {
                        name: product.name,
                        cost: product.cost,
                        img: product.img,
                        count: count,
                        productId: product._id
                    }, {
                        headers: {
                            'Authorization': token
                        }
                    })
                        .then((res) => {
                            setButtonBasket("Add to basket")
                            setImageButton({lock: lock})
                            setStyleButton("");
                            setBasket([...basket, res.data])
                            setAccept(true)
                            setTextError('')
                        })
                        .catch(() => {
                            return "error"
                        });
                }
            }
        }
    }

    const deleteProduct = () => {
        if (count > 1 && count <= 3) {
            setCount((count) => --count)
        }
    };

    const addProduct = () => {
        if (count >= 1 && count < 3) {
            setCount((count) => ++count)
        }
    };

    if(!Boolean(product)) {
        return <div>Loading...</div>
    }

    return (
        <div className="product-grid">
            <div className="product-img">
                <img src={require(`../../${product.img}`)} alt="text"/>
            </div>
            <div>
                <p className="article">SKU: {product._id}</p>
                <p>{product.name}</p>
                <p>Description: </p>
                <p>{product.description}</p>
                <div className="count">
                    <span>${product.cost}.00</span>
                    <button onClick={deleteProduct}>
                        <div className="minus" />
                    </button>
                    <span>{count}</span>
                    <button onClick={addProduct}>
                        <div className="plus1" />
                        <div className="plus2" />
                    </button>
                </div>
                <div className="button-basket">
                    {loginCondition ?
                        <button onClick={addToBasket}><img className={styleButton} src={imageButton.lock} alt="text"/>{buttonBasket}</button>
                        :
                        <button onClick={loginOpen}><img className={styleButton} src={imageButton.lock} alt="text"/>{buttonBasket}</button>
                    }
                    {accept && <AcceptMessage/>}
                    {textError && <ErrorMessage textError={textError}/>}
                </div>
            </div>
        </div>
    );
};

export default Product;