import { AxiosError } from "axios";
import { configApi } from "../api/configApi";
import { LoginResponse, RegisterUser } from "../interfaces";

export class AuthService {
    static login = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const { data } = await configApi.post<LoginResponse>('/api/auth/login', { email, password });
            console.log("API Response:>>>>>>>>>", data);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data);
                throw new Error(error.response?.data?.message );
            }
            console.error(error);
            throw new Error("An unexpected error occurred while logging in. Please try again.");
        }
    };

    static registerUser = async (dataUser: RegisterUser): Promise<{ message: string }> => {
        try {
            const { data } = await configApi.post<{ message: string }>('/api/auth/register', dataUser);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data);
                throw new Error(error.response?.data?.message || "Unable to register the user. Please check the details and try again.");
            }
            console.error(error);
            throw new Error("An unexpected error occurred while registering the user. Please try again.");
        }
    };
}
