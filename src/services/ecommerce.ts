import {
  CreateProductType,
  ProductResponse,
  ProductType,
  UpdateProductType,
} from "@/lib/products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { url } from "inspector";
// import { headers } from "next/headers";

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_ISHOP_BASE_URL}`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // getAllProducts
    getAllProduct: builder.query<
      ProductResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `/products?page=${page}&size=${size}`,
      providesTags: ["Product"],
    }),
    //  getProductByUUid
    getProductByUuid: builder.query<ProductType, string>({
      query: (uuid: string) => ({
        url: `/products/${uuid}`,
      }),
      providesTags: ["Product"],
    }),
    // create Product
    createProduct: builder.mutation<CreateProductType, unknown, unknown>({
      query: ({ newProduct, accessToken }) => ({
        url: `/products`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<UpdateProductType, unknown>({
      query: ({ updateProduct, uuid, accessToken }) => ({
        url: `/products/${uuid}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: updateProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProductByUuid: builder.mutation<unknown, unknown>({
      query: ({ uuid, accessToken }) => {
        return {
          url: `products/${uuid}`,
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByUuidQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductByUuidMutation,
} = ecommerceApi;
