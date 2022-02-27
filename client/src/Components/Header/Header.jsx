import React, {useContext} from 'react';

import {Link} from "react-router-dom";
import LoginButtons from "./Login-buttons";
import ModalRegister from "./Modal-register";
import ModalLogin from "./Modal-login";

import logo from '../../images/logo.png';
import bag from '../../images/bag.png';
import person from '../../images/person.png';
import './Header.scss';
import {MyContext} from "../../App";

const Header = () => {

    const { userId, loginCondition, setLoginCondition, basket, loginOpen, setUserid, setToken } = useContext(MyContext)

    const logOut = () => {
        localStorage.setItem('loginCondition', JSON.stringify(false));
        localStorage.setItem('userId', JSON.stringify(''));
        localStorage.setItem('token', JSON.stringify(''));
        setLoginCondition(false);
        setUserid(null)
        setToken(null)
    }

    return (
        <div className="container-header">
            <div className="container container-header-div">
                <Link to={`/`}>
                    <div>
                        <img src={logo} alt="text"/>
                    </div>
                </Link>
                <div className="rightMenu">
                    <div className="person">
                        <img className="person-image" src={person} alt="text"/>
                        <LoginButtons
                            logOut={logOut}
                        />
                    </div>
                    <div className="block-basket">
                        {loginCondition ?
                            <Link to={`/basket/${userId}`}>
                                <img src={bag} alt="text"/>
                                {basket.length > 0 && loginCondition && <div className="add-to-cart">{basket.length}</div>}
                                <span>Cart</span>
                            </Link>
                            :
                            <a onClick={loginOpen} className="pointer">
                                <img src={bag} alt="text"/>
                                {basket.length > 0 && loginCondition && <div className="add-to-cart">{basket.length}</div>}
                                <span>Cart</span>
                            </a>
                        }
                    </div>
                </div>
            </div>
            <ModalRegister />
            <ModalLogin />
        </div>
    );
};

export default Header;