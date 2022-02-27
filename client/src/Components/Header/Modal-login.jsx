import React, {useContext, useState} from 'react';

import axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import {MyContext} from "../../App";
import {inputsLogin} from "../../mock";
import FormModal from "./FormModal";

const ModalLogin = () => {

    const {
        registerOpen,
        openLogin,
        loginClose,
        registerClose,
        setUserid,
        setToken,
        setLoginCondition
    } = useContext(MyContext)

    const [textErrorHeaderLogin, setTextErrorHeaderLogin] = useState("");

    const nameButton = "Log In";

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('Required'),
        }),
        onSubmit: (values, {resetForm}) => {
            axios.post("http://localhost:5000/api/auth/login", {
                email: formik.values.email,
                password: formik.values.password
            })
                .then((res) => {
                    resetForm({values: ""})
                    localStorage.setItem('loginCondition', JSON.stringify(true));
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    localStorage.setItem("userId", JSON.stringify(res.data.userId));
                    setToken(res.data.token)
                    setUserid(res.data.userId);
                    setLoginCondition(true);
                    loginClose(true);
                    registerClose(true);
                })
                .catch(() => {
                    setTextErrorHeaderLogin("Incorrect login or password");
                })

        },
    });

    return (
        <Modal
            open={openLogin}
            onClose={loginClose}
        >
            <Box className="modal-login">
                <div className="modal-login">
                    <p className="name-modal">Log in to your account</p>
                    <div className="input-modal">
                        <FormModal
                            formik={formik}
                            textErrorHeaderLogin={textErrorHeaderLogin}
                            inputs={inputsLogin}
                            nameButton={nameButton}
                        />
                    </div>
                    <p className="without-account">No account? <span onClick={() => {
                        registerOpen(true)
                        loginClose(true)
                    }} className="sign-in">Create one</span>
                    </p>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalLogin;