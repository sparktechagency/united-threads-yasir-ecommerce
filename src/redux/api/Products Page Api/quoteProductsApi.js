import { tagTypes } from "@/redux/tagtypes";
import { baseApi } from "../baseApi";

const quoteProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuoteCategories: builder.query({
      query: () => ({
        url: "/quote-category/categories",
        method: "GET",
      }),

      providesTags: [tagTypes.quoteCategories],
    }),

    getQuoteSizes: builder.query({
      query: () => ({
        url: "/quote-product/get-size",
        method: "GET",
      }),
      providesTags: [tagTypes.quoteSizes],
    }),

    getQuoteProducts: builder.query({
      query: () => ({
        url: "/quote-product/products",
        method: "GET",
      }),

      providesTags: [tagTypes.quoteProducts],
    }),

    getSingleQuoteProduct: builder.query({
      query: (productId) => ({
        url: `/quote-product/single-product/${productId}`,
        method: "GET",
      }),

      providesTags: [tagTypes.quoteProduct],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetQuoteCategoriesQuery,
  useGetQuoteProductsQuery,
  useGetSingleQuoteProductQuery,
  useGetQuoteSizesQuery,
} = quoteProductsApi;
