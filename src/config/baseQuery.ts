import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { getBaseApiUrl } from "./api";

// Type for our Redux state
interface RootState {
  auth: {
    token?: string;
  };
}

// Base query configuration that can be reused across all APIs
export const createBaseQuery = (options?: {
  baseUrl?: string;
  prepareHeaders?: (
    headers: Headers,
    api: { getState: () => unknown }
  ) => Headers;
}): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return fetchBaseQuery({
    baseUrl: options?.baseUrl || getBaseApiUrl(),
    prepareHeaders: (headers, { getState }) => {
      // Apply custom header preparation if provided
      if (options?.prepareHeaders) {
        headers = options.prepareHeaders(headers, { getState });
      }

      // Add auth token if available
      const state = getState() as RootState;
      const token = state.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      // Add common headers
      headers.set("content-type", "application/json");
      headers.set("accept", "application/json");

      return headers;
    },
    // Add timeout from config
    timeout: 10000,
  });
};

// Default base query for most APIs
export const baseQuery = createBaseQuery();

// Base query with custom error handling
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle 401 errors (unauthorized)
  if (result.error && result.error.status === 401) {
    // You can dispatch a logout action here if needed
    console.warn("Authentication failed, user needs to log in again");
    // Example: api.dispatch(logout());
  }

  return result;
};
