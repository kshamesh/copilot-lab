import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PatchPostRequest,
} from "../types/post";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // Get all posts
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),

    // Get a single post by ID
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),

    // Get posts by userId
    getPostsByUserId: builder.query<Post[], number>({
      query: (userId) => `/posts?userId=${userId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    // Create a new post
    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
      // Optimistic update
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        const optimisticPost: Post = {
          id: Math.floor(Math.random() * 10000),
          ...request,
        };
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPosts", undefined, (draft) => {
            draft.unshift(optimisticPost);
          }),
        );
        try {
          const { data } = await queryFulfilled;
          // Update with actual response data
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const index = draft.findIndex((p) => p.id === optimisticPost.id);
              if (index !== -1) {
                draft[index] = data;
              }
            }),
          );
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Update an entire post (PUT)
    updatePost: builder.mutation<Post, UpdatePostRequest>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result) => [
        { type: "Post", id: result?.id },
        { type: "Post", id: "LIST" },
      ],
      // Optimistic update
      async onQueryStarted({ id, ...update }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((p) => p.id === id);
            if (post) {
              Object.assign(post, update);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Partially update a post (PATCH)
    patchPost: builder.mutation<Post, { id: number; body: PatchPostRequest }>({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result) => [
        { type: "Post", id: result?.id },
        { type: "Post", id: "LIST" },
      ],
    }),

    // Delete a post
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
      // Optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPosts", undefined, (draft) => {
            return draft.filter((p) => p.id !== id);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  usePatchPostMutation,
  useDeletePostMutation,
} = postApi;
