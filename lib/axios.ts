import axios from "axios";
import { User } from "next-auth";
import { getSession, signOut } from "next-auth/react";
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    Authorization: "",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") {
      return config;
    }
    const session = await getSession();
    console.log("session", session);
    const user = session?.user as User & { accessToken: string };
    const token = session ? user.accessToken : undefined;

    if (session) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.path !== "POST /auth/verify-otp"
    ) {
      signOut();
    }
    return Promise.reject(error);
  }
);
