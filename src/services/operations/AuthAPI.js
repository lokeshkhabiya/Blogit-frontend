import { BASE_URL } from "../../../ApiConnection";
import { apiConnector } from "../ApiConnector";
import { AuthPoints } from "../Apis";

export const signupUsingEmail = async (full_name, email, password) => {
    try {
        const response = await apiConnector(
            'POST', 
            AuthPoints.SIGNUP_USING_EMAIL,
            { full_name: full_name, email: email, password: password },
            null, 
            null, 
            null
        )

        const loginTimeStamp = new Date().getTime().toString();
        localStorage.setItem("loginTimeStamp", loginTimeStamp);

        return response;
    } catch (error) {
        console.log("Error while Signup using email: ", error);
    }
}

export const signinUsingEmail = async (email, password) => {
    try {
        const response = await apiConnector(
            'POST',
            AuthPoints.SIGNIN_USING_EMAIL,
            { email: email, password: password },
            null,
            null,
            null
        )

        const loginTimeStamp = new Date().getTime().toString();
        localStorage.setItem("loginTimeStamp", loginTimeStamp);
        return response;
    } catch (error) {
        console.log("Error while Signin using email: ", error);
    }
}

export const signinUsingGoogle = async () => {
    const response = await apiConnector(
        'GET', 
        AuthPoints.SIGNIN_USING_GOOGLE,
        null, 
        null,
        null,
        null
    )

    const loginTimeStamp = new Date().getTime().toString();
    localStorage.setItem("loginTimeStamp", loginTimeStamp);

    return response;
}

export const initiateGoogleLogin = () => {
    window.location.href = `${BASE_URL}auth/google`;
}

export const getUserData = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}auth/getUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};