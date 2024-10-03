import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),

      providesTags: [tagTypes.category],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
