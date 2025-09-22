import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../config/baseQuery";

// Example interfaces for User API
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  createdAt: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Example User API using the global configuration
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth, // Uses global config
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    // User management endpoints
    getProfile: builder.query<User, void>({
      query: () => "users/profile",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (updates) => ({
        url: "users/profile",
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUsersQuery,
} = userApi;
