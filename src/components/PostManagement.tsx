import { usePosts } from '../hooks/usePosts'
import { PostForm } from './PostForm'
import { PostList } from './PostList'
import './PostManagement.css'

export function PostManagement() {
  const { posts, loading, error, addPost, removePost } = usePosts()

  const handleAddPost = async (data: any) => {
    return await addPost(data)
  }

  const handleDeletePost = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?')
    if (confirmed) {
      await removePost(id)
    }
  }

  return (
    <div className="post-management">
      <h2>Post Management</h2>

      {error && (
        <div className="post-management-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      <PostForm onSubmit={handleAddPost} loading={loading} />
      <PostList posts={posts} loading={loading} onDelete={handleDeletePost} />
    </div>
  )
}
