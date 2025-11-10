import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; 

const PostDetail =()=> {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const postRes = await fetch(`${API_URL}/posts/${id}`);
        if (!postRes.ok) throw new Error("Không thể tải bài viết");
        const postData = await postRes.json();
        setPost(postData);

        const commentsRes = await fetch(`${API_URL}/posts/${id}/comments`);
        if (!commentsRes.ok) throw new Error("Không thể tải bình luận");
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!post) return <p>Không tìm thấy bài viết</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Quay lại danh sách</Link>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <h3>Bình luận:</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <strong>{c.email}</strong>: {c.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetail;
