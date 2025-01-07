import { DashboardMetrics } from "@/types/DashboardMetrics";
import { PaginatedResponse } from "@/types/PaginatedResponse";
import { Product } from "@/types/Product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/metrics/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<
      PaginatedResponse<Product>,
      { search?: string; page?: number; pageSize?: number } | void
    >({
      query: (queryParams) => {
        const { search, page, pageSize } = queryParams || {};

        return {
          url: "/products",
          params: {
            ...(search && { search }),
            ...(page && { page }),
            ...(pageSize && { pageSize }),
          },
        };
      },
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, Omit<Product, "productId">>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
} = api;
