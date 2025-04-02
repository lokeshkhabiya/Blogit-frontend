import { BASE_URL } from "../../ApiConnection";

export const AuthPoints = {
    SIGNUP_USING_EMAIL : `${BASE_URL}auth/signupUsingEmail`,
    SIGNIN_USING_EMAIL : `${BASE_URL}auth/signinUsingEmail`,
    SIGNIN_USING_GOOGLE : `${BASE_URL}auth/google`,
}

export const UserPoints = {
    UPDATE_USER_DETAILS: `${BASE_URL}user/updateDetails`
}

export const BlogPoints = {
    PUBLISH: `${BASE_URL}blog/publish`,
    GET_BLOG: `${BASE_URL}blog/getBlog`,
    LIKE_UNLIKE_BLOG: `${BASE_URL}blog/likeUnlikeBlog`,
    GET_ALL_BLOGS_BULK: `${BASE_URL}blog/getAllBlogsBulk`,
    GET_ALL_MY_BLOGS: `${BASE_URL}blog/getAllMyBlogs`,
}

export const CommentPoints = {
    ADDACOMMENT: `${BASE_URL}comment/addAComment`,
    GETALLCOMMENT: `${BASE_URL}comment/getAllComments`,
}