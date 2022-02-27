import React, {useContext} from 'react';

import {MyContext} from "../../App";

const LoginButtons = ({logOut}) => {

    const { loginOpen, registerOpen, loginCondition } = useContext(MyContext)

    return (
        <div>
            {!loginCondition ? (
                <>
                    <span onClick={registerOpen}>Sign up</span>
                    <span>/</span>
                    <span onClick={loginOpen}>Sign in</span>
                </>
            ) : (
                <span onClick={logOut}>Log out</span>
            )}
        </div>
    );
};

export default LoginButtons;