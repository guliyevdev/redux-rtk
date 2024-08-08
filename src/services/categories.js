// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://northwind.vercel.app/api/' }),
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => 'categories',
        }),
        getCategoryById: builder.query({
            query: (id) => `categories/${id}`,
        }),
    }),
})
export const { useGetAllCategoriesQuery,useGetCategoryByIdQuery } = categoriesApi;