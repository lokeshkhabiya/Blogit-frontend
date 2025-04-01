import { BASE_URL } from "../../../ApiConnection";
import { useAuthStore } from "../../stores/authStore";
import { apiConnector } from "../ApiConnector";
import { BlogPoints } from "../Apis";

export const publishBlog = async( title, description, cover_img, category, content, token ) => {
    try {
        const response = await apiConnector(
            'POST',
            BlogPoints.PUBLISH,
            { title, description, cover_img, category, content },
            { authorization: token },
            null, 
            null
        )

        return response; 
    } catch (error) {
        console.log("Error while publishing the blog: ", error);
    }
}

export const getBlog = async( blog_id, token ) => {
    try {
        const response = await apiConnector(
            'GET',
            BlogPoints.GET_BLOG,
            null,
            { authorization: token },
            { blog_id: blog_id},
            null
        )

        return response
    } catch (error) {
        console.log("Error while publishing the blog: ", error);
    }
}