import axios from "axios"
import { toast } from "react-hot-toast"
import { useAuthStore } from "../stores/authStore"

export const axiosInstance = axios.create({})

export const apiConnector = async (
    method,
    url,
    bodyData,
    headers,
    params,
    responseType
) => {
    try {
        let fields = {
            method: method,
            url: url,
            data: bodyData ? bodyData : null,
            headers: headers ? headers : null,
            params: params ? params : null,
        }

        if (responseType) {
            fields.responseType = responseType
        }

        const response = await axiosInstance(fields)

        return response
    } catch (error) {
        if (error.response && error.response.status === 408) {
            toast.error("Session Expired! Please login again.")
            setTimeout(() => {
                localStorage.clear()
                useAuthStore.getState().logout()
                window.location.reload()
            }, 200)
        }
        throw error
    }
}
