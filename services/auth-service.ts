import { axiosInstance } from "@/lib/axios";
import { routes } from "@/lib/constants";

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const register = async (data: RegisterData) => {
  const response = await axiosInstance.post(routes.register, data);
  return response;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post(routes.login, data);

  return response;
};

export const loggedUser = async (token?: string | null) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axiosInstance.get(routes.loggedUser, {
    headers,
  });
  return response;
};
