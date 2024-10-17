import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.orders],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
