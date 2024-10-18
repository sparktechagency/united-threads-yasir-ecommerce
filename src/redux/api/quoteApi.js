import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const quoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuotes: builder.query({
      query: (params) => ({
        url: "/quote/my-quotes",
        method: "GET",
        params,
      }),
    }),

    createQuote: builder.mutation({
      query: (data) => ({
        url: "/quote/create-quote",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.quotes],
    }),
  }),
});

export const { useCreateQuoteMutation, useGetQuotesQuery } = quoteApi;
