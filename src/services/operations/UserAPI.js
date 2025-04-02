import { apiConnector } from "../ApiConnector";
import { UserPoints } from "../Apis";

export const updateDetails = async ( full_name, bio, token ) => {
    try {
        const response = await apiConnector(
            "POST", 
            UserPoints.UPDATE_USER_DETAILS,
            { full_name: full_name, bio: bio },
            { authorization: token },
            null, 
            null 
        )

        return response
    } catch (error) {
        console.log("Error while updating user details: ", error);
    }
}