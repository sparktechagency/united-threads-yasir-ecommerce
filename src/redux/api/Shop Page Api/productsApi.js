import { tagTypes } from "../../tagtypes";
import { baseApi } from "../baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getProducts: build.query({
    //   query: () => "/products",
    // }),

    getCategories: builder.query({
      query: () => ({
        url: "/category/categories",
        method: "GET",
      }),

      providesTags: [tagTypes.category],
    }),
  }),
});

export const { useGetCategoriesQuery } = productsApi;
