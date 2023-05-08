import { useState } from "react";

function useToken() {
    function getToken() {
        const userToken = JSON.parse(localStorage.getItem('accessToken'));
        if (userToken) return userToken;
        else return null;
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem('accessToken', JSON.stringify(userToken));
        setToken(userToken);
    }

    return {token, setToken: saveToken};
}

export default useToken;