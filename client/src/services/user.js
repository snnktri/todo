import { api } from "../utils/axiosInstance";

export const signUp = async(data) => {
    try {
        const response = await api.post(
            "/users/signup", data
        );

       // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error on sign up: ", error);
    }
}

export const login = async(logindata) => {
    try {
        const response = await api.post("/users/login", logindata)
       // console.log(response.data);
        localStorage.setItem("user", response.data.data.accessToken);
        return response.data;
    } catch (error) {
        console.error("Error on login: ", error);
    }
}