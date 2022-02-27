import {createContext, useEffect, useState} from "react";

import {Route, Routes} from "react-router-dom";
import axios from "axios";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import './App.css';
import {routes} from "./mock";
import './Media.scss';

export const MyContext = createContext({})

function App() {
    const [basket, setBasket] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserid] = useState(JSON.parse(localStorage.getItem("userId")) || null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || null);
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [loginCondition, setLoginCondition] = useState(JSON.parse(localStorage.getItem('loginCondition')) || false)

    const registerOpen = () => setOpenRegister(true);
    const registerClose = () => setOpenRegister(false);
    const loginOpen = () => setOpenLogin(true);
    const loginClose = () => setOpenLogin(false);

    const values = {
        basket,
        setBasket,
        products,
        setProducts,
        users,
        setUsers,
        userId,
        setUserid,
        token,
        loginCondition,
        setLoginCondition,
        openLogin,
        setOpenLogin,
        openRegister,
        setOpenRegister,
        setToken,
        registerClose,
        registerOpen,
        loginOpen,
        loginClose
    }

    useEffect(() => {
        if(userId) {
            axios.get(`http://localhost:5000/api/basket/${userId}`, {
                headers: {
                    'Authorization': token
                }
            })
                .then((res) => {
                    setBasket(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        axios.get("http://localhost:5000/api/products")
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [userId])

    return (
        <MyContext.Provider value={values}>
            <div>
                <Header/>
                <Routes>
                    {routes.map((route) => (
                        <Route exact path={route.path} element={route.component} key={route.path}/>
                    ))}
                </Routes>
                <Footer/>
            </div>
        </MyContext.Provider>
    );
}

export default App;
