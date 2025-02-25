// tokenService.tsx

import { useNavigate } from "react-router";

export const getToken = () => {
    const userDataString = localStorage.getItem('Userdata');
    if (userDataString) {
        const { token } = JSON.parse(userDataString);

        return token;
    }
    return null;
};

export const useToken = () => {
    const navigate = useNavigate();
    const token = getToken();

    if (!token) {

        navigate('/account/login');
        return null;
    }

    return token;
};
