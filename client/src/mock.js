import React from "react";

import MainPage from "./Components/Main-page/Main-page";
import ProductCard from "./Components/Product-card/Product-card";
import Basket from "./Components/Basket/Basket";

export const routes = [
    {
        path: '/',
        component: <MainPage />,
    },
    {
        path: '/products/:id',
        component: <ProductCard />,
    },
    {
        path: '/basket/:id',
        component: <Basket />,
    }
];

export const linksFooter = ["Our Products", "Privacy Terms", "Twitter", "Facebook", "Email"];

export const inputsRegister = [
    {
        label: "Name",
        name: "name",
        placeholder: "Your name"
    },
    {
        label: "Email",
        name: "email",
        placeholder: "Your email"
    },
    {
        label: "Password",
        name: "password",
        placeholder: "Enter your password"
    },
];

export const inputsLogin = [
    {
        label: "Email",
        name: "email",
        placeholder: "Your email"
    },
    {
        label: "Password",
        name: "password",
        placeholder: "Enter your password"
    },
];
