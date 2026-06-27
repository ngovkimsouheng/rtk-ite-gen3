// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface UploadResponse {
//   name: string;
// }

// export const uploadApi = createApi({
//   reducerPath: "uploadApi",

//   baseQuery: fetchBaseQuery({
//     baseUrl: `${process.env.NEXT_PUBLIC_ISHOP_BASE_URL}`,
//   }),

//   tagTypes: ["Files"],

//   endpoints: (builder) => ({
//     uploadFiles: builder.mutation<UploadResponse, File>({
//       query: (files) => {
//         const formData = new FormData();
//         formData.append("files", files);

//         return {
//           url: "/medias/upload-multiple",
//           method: "POST",
//           headers: {
//             "content-type": "multipart/form-data",
//           },
//           body: formData,
//         };
//       },

//       invalidatesTags: ["Files"],
//     }),
//   }),
// });

// export const { useUploadFilesMutation } = uploadApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UploadResponse {
  filename: string;
  originalname: string;
  location: string;
}

export const uploadApi = createApi({
  reducerPath: "uploadApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1",
  }),

  tagTypes: ["Files"],

  endpoints: (builder) => ({
    uploadFiles: builder.mutation<UploadResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/files/upload",
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: ["Files"],
    }),
  }),
});

export const { useUploadFilesMutation } = uploadApi;
