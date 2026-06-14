import type { Post } from '../types/post'
import './PostList.css'

interface PostListProps {
  posts: Post[] | undefined
  loading: boolean
  onDelete: (id: number) => void
}

export function PostList({ posts, loading, onDelete }: PostListProps) {
  if (loading) {
    return <div className="post-list-loading">Loading posts...</div>
  }

  if (!posts || posts.length === 0) {
    return <div className="post-list-empty">No posts found</div>
  }

  return (
    <div className="post-list-container">
      <table className="post-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td className="post-title">{post.title}</td>
              <td className="post-body">{post.body}</td>
              <td>
                <button
                  className="post-delete-btn"
                  onClick={() => onDelete(post.id)}
                  title="Delete post"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
