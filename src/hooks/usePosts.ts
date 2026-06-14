import { useMemo } from "react";
import type {
  CreatePostRequest,
  UpdatePostRequest,
  PatchPostRequest,
} from "../types/post";
import {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  usePatchPostMutation,
  useDeletePostMutation,
} from "../api/postApi";

export function usePosts() {
  const { data: posts, isLoading, error: queryError } = useGetPostsQuery();
  const [createMutation, createMutationState] = useCreatePostMutation();
  const [updateMutation, updateMutationState] = useUpdatePostMutation();
  const [patchMutation, patchMutationState] = usePatchPostMutation();
  const [deleteMutation, deleteMutationState] = useDeletePostMutation();

  // Determine overall loading and error state
  const loading =
    isLoading ||
    createMutationState.isLoading ||
    updateMutationState.isLoading ||
    patchMutationState.isLoading ||
    deleteMutationState.isLoading;

  const error =
    queryError ||
    createMutationState.error ||
    updateMutationState.error ||
    patchMutationState.error ||
    deleteMutationState.error;

  // Format error message
  const errorMessage = useMemo(() => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object" && "data" in error) {
      return error.data as string;
    }
    if (error && typeof error === "object" && "status" in error) {
      return `Error: ${error.status}`;
    }
    return error ? "An error occurred" : null;
  }, [error]);

  const addPost = async (request: CreatePostRequest): Promise<boolean> => {
    try {
      await createMutation(request).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const updateExisting = async (
    _id: number,
    request: UpdatePostRequest,
  ): Promise<boolean> => {
    try {
      await updateMutation(request).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const partialUpdate = async (
    id: number,
    request: PatchPostRequest,
  ): Promise<boolean> => {
    try {
      await patchMutation({ id, body: request }).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const removePost = async (id: number): Promise<boolean> => {
    try {
      await deleteMutation(id).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  return {
    posts,
    loading,
    error: errorMessage,
    addPost,
    updateExisting,
    partialUpdate,
    removePost,
  };
}

export function usePostById(id: number) {
  const { data: post, isLoading, error } = useGetPostByIdQuery(id);

  const errorMessage = useMemo(() => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object" && "data" in error) {
      return error.data as string;
    }
    return error ? "An error occurred" : null;
  }, [error]);

  return {
    post,
    loading: isLoading,
    error: errorMessage,
  };
}

export function usePostsByUserId(userId: number) {
  const { data: posts, isLoading, error } = useGetPostsByUserIdQuery(userId);

  const errorMessage = useMemo(() => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object" && "data" in error) {
      return error.data as string;
    }
    return error ? "An error occurred" : null;
  }, [error]);

  return {
    posts,
    loading: isLoading,
    error: errorMessage,
  };
}
