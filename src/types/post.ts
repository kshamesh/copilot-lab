// Post data model following JSONPlaceholder conventions
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// API request/response types
export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostRequest {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PatchPostRequest {
  title?: string;
  body?: string;
  userId?: number;
}
