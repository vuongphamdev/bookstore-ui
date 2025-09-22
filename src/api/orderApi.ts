import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../config/baseQuery";

// Example interfaces for Order API
interface OrderItem {
  bookId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

interface CreateOrderRequest {
  items: Omit<OrderItem, "price">[];
}

// Example Order API using the global configuration
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth, // Uses global config
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "orders",
      providesTags: ["Order"],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => `orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Order", id }],
    }),
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (orderData) => ({
        url: "orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<
      Order,
      { id: string; status: Order["status"] }
    >({
      query: ({ id, status }) => ({
        url: `orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Order", id }],
    }),
    cancelOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `orders/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Order", id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
} = orderApi;
