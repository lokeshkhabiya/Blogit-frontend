import { BASE_URL } from "../../ApiConnection";

export const AuthPoints = {
    SIGNUP_USING_EMAIL : `${BASE_URL}auth/signupUsingEmail`,
    SIGNIN_USING_EMAIL : `${BASE_URL}auth/signinUsingEmail`,
    SIGNIN_USING_GOOGLE : `${BASE_URL}auth/google`,
}

export const BlogPoints = {
    PUBLISH: `${BASE_URL}blog/publish`,
    GET_BLOG: `${BASE_URL}blog/getBlog`,
    LIKE_UNLIKE_BLOG: `${BASE_URL}blog/likeUnlikeBlog`
}

export const CommentPoints = {
    ADDACOMMENT: `${BASE_URL}comment/addAComment`,
    GETALLCOMMENT: `${BASE_URL}comment/getAllComments`,
}