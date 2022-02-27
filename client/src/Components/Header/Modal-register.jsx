import React, {useContext, useState} from 'react';

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";

import {MyContext} from "../../App";
import {inputsRegister} from "../../mock";
import FormModal from "./FormModal";

const ModalRegister = () => {

    const {
        openRegister,
        registerClose,
        loginOpen,
        users,
        setUsers
    } = useContext(MyContext)

    const [textErrorHeaderEmail, setTextErrorHeaderEmail] = useState("");

    const nameButton = "Register";

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            const user = {...values, id: Date.now()};
            const newUsers = [...users, user];
            axios.post("http://localhost:5000/api/auth/register", {
                email: formik.values.email,
                password: formik.values.password
            })
                .then(() => {
                    setUsers(newUsers);
                    setTextErrorHeaderEmail("asd");
                    loginOpen(true);
                    registerClose(true);
                })
                .catch(() => {
                    setTextErrorHeaderEmail("User with this email already exists");
                });
        }
    });
    return (
        <Modal
            open={openRegister}
            onClose={registerClose}
        >
            <Box className="modal-register">
                <div className="modal-container">
                    <p className="name-modal">Create an account</p>
                    <div className="input-modal">
                        <FormModal
                            nameButton={nameButton}
                            formik={formik}
                            textErrorHeaderEmail={textErrorHeaderEmail}
                            inputs={inputsRegister}
                        />
                    </div>
                    <p className="without-account">Do you already have an account?</p>
                    <p onClick={() => {
                        loginOpen(true)
                        registerClose(true)
                    }} className="sign-in">Sing in</p>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalRegister;