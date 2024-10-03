import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContents: builder.query({
      query: () => ({
        url: "/contents",
        method: "GET",
      }),

      providesTags: [tagTypes.content],
    }),

    getAboutPageContent: builder.query({
      query: () => ({
        url: "/contents/about-us-page",
        method: "GET",
      }),

      providesTags: [tagTypes.aboutUsContent],
    }),
  }),
});

export const { useGetContentsQuery, useGetAboutPageContentQuery } = contentApi;
