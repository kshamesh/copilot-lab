import { useState } from "react";
import type { CreatePostRequest } from "../types/post";
import "./PostForm.css";

interface PostFormProps {
  onSubmit: (data: CreatePostRequest) => Promise<boolean>;
  loading: boolean;
}

export function PostForm({ onSubmit, loading }: PostFormProps) {
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: "",
    body: "",
    userId: 1,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.body.trim()) {
      setError("Body is required");
      return;
    }
    if (formData.userId < 1) {
      setError("User ID must be at least 1");
      return;
    }

    const success = await onSubmit(formData);
    if (success) {
      setFormData({
        title: "",
        body: "",
        userId: 1,
      });
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>Create New Post</h3>

      {error && <div className="post-form-error">{error}</div>}

      <div className="post-form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
          disabled={loading}
        />
      </div>

      <div className="post-form-group">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Enter post content"
          rows={5}
          disabled={loading}
        />
      </div>

      <div className="post-form-group">
        <label htmlFor="userId">User ID</label>
        <input
          type="number"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          min="1"
          disabled={loading}
        />
      </div>

      <button type="submit" className="post-form-submit" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
