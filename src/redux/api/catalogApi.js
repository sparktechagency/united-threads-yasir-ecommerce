import { baseApi } from "./baseApi";

const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCatalogue: builder.query({
      query: () => ({
        url: "/catalogue",
      }),
    }),

    createUserBeforeDownloadCatalog: builder.mutation({
      query: (body) => ({
        url: "/download-catalogue/create",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetCatalogueQuery,
  useCreateUserBeforeDownloadCatalogMutation,
} = catalogApi;
