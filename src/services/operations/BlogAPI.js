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
        console.log("Error while getting the blog: ", error);
    }
}

export const likeUnlikeBlog = async( blog_id, token ) => {
    try {
        const response = await apiConnector(
            'POST',
            BlogPoints.LIKE_UNLIKE_BLOG,
            { blog_id: blog_id },
            { authorization: token },
            null,
            null
        )
    } catch (error) {
        console.log("Error while like / unlike the blog: ", error);
    }
}

export const getAllBlogsBulk = async (page, limit, token) => {
    try {
        const response = await apiConnector(
            'GET',
            BlogPoints.GET_ALL_BLOGS_BULK,
            null,
            { authorization: token },
            { page: page, limit: limit },
            null
        )

        return response; 
    } catch (error) {
        console.log("Error while fetching blogs bulk: ", error);
    }
}

export const getAllMyBlogs = async ( token ) => {
    try {
        const response = await apiConnector(
            'GET',
            BlogPoints.GET_ALL_MY_BLOGS,
            null,
            { authorization: token },
            null,
            null
        )

        return response; 
    } catch (error) {
        console.log("Error while fetching my blogs: ", error);
    }
}

