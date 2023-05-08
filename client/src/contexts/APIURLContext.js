import { createContext } from "react";

const apiURL = () => process.env.NODE_ENV === 'production' ?
    process.env.REACT_APP_PROD_API_URL :
    process.env.REACT_APP_DEV_API_URL;

const APIURLContext = createContext(apiURL());

export default APIURLContext;