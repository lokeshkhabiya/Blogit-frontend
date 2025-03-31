import { BASE_URL } from "../../ApiConnection";

export const AuthPoints = {
    SIGNUP_USING_EMAIL : `${BASE_URL}auth/signupUsingEmail`,
    SIGNIN_USING_EMAIL : `${BASE_URL}auth/signinUsingEmail`,
    SIGNIN_USING_GOOGLE : `${BASE_URL}auth/google`,
}