import './LoginForm.css';
import APIURLContext from "contexts/APIURLContext";
import { useState, useContext } from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import useToken from 'hooks/useToken';

function LoginForm() {
    const [inputs, setInputs] = useState({});
    const apiURL = useContext(APIURLContext);
    const {token, setToken} = useToken();

    if (token) return(<Navigate replace to="/me"/>);

    async function loginUser(credentials) {
        try {
            let res = await axios.post(`${apiURL}/users/login`, credentials);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }

    const handleChange = event => {
        setInputs(values => ({...values, [event.target.name]: event.target.value}));
    };
    const handleSubmit = async event => {
        event.preventDefault();
        let loginCredentials = {email: inputs.email, password: inputs.password};
        const loginResponse = await loginUser(loginCredentials);
        if (!loginResponse) alert('Login invalid, please try again');
        else {
            setToken(loginResponse.accessToken);
            localStorage.setItem('_id', loginResponse._id);
            window.location.replace('/me');
        }
    };

    return(
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-4 form-group">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" placeholder="john@example.com" required className="form-control w-75"
                    value={inputs.email || ""} onChange={handleChange}/>
            </div>
            <div className="mb-4 form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" required className="form-control w-75"
                    value={inputs.password || ""} onChange={handleChange}/>
            </div>
            <input type="submit" value="Log In"/>
        </form>
    );
}

export default LoginForm;