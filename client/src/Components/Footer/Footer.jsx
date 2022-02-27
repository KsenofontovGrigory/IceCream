import React from 'react';
import {Link} from "react-router-dom";

import logo from '../../images/logo.png';
import './Footer.scss';
import {linksFooter} from "../../mock";

const Footer = () => {
    return (
        <div className="container-footer">
            <div className="container footer">
                <Link to="/">
                    <div>
                        <img src={logo} alt="text"/>
                    </div>
                </Link>
                <div className={"links-footer"}>
                    {linksFooter.map((item) => (
                        <a key={item}>{item}</a>
                    ))}
                </div>
            </div>
            <div className="container-about-company">
                <div className="container">
                    <p>© 2021 Justice-team. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;