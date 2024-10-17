import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
