import { api } from "../utils/axiosInstance";

export const signUp = async(data) => {
    try {
        const response = await api.post(
            "/users/signup", data
        );

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error on login: ", error);
    }
}