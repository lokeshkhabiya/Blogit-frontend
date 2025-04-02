import { apiConnector } from "../ApiConnector";
import { CommentPoints } from "../Apis";

export const addAComment = async( blog_id, comment, timeStamp, token ) => {
    try {
        const response = await apiConnector(
            "POST", 
            CommentPoints.ADDACOMMENT,
            { blog_id: blog_id, comment: comment, timeStamp: timeStamp},
            { authorization: token },
            null, 
            null
        )

        return response;
    } catch (error) {
        console.log("Error while writing comment on the blog: ", error);
    }
}

export const getAllComments = async ( blog_id, token ) => {
    try {
        const response = await apiConnector(
            "GET", 
            CommentPoints.GETALLCOMMENT,
            null,
            { authorization: token},
            { blog_id: blog_id },
            null
        )

        return response; 
    } catch (error) {
        console.log("Erro while getting all comments: ", error);
    }
}