import axios from "axios";
import { UNSPLASH_API_KEY } from "./ApiKeys";

export const getRandomUnsplashImage = async () => {
    try {
        // const response = await axios.get(`https://api.unsplash.com/photos/random?orientation=landscape&client_id=${UNSPLASH_API_KEY}`);
        // return response.data.urls.regular;
        return "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    } catch (error) {
        console.error("Error while fetching random Unsplash image: ", error);
        return "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
};