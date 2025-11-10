import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostDetail, clearPost } from "../store/postSlice";
import type { RootState, AppDispatch } from "../store/store";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { post, comments, loading, error } = useSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    if (id) dispatch(fetchPostDetail(id));

    // Clear state khi rời trang
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg">
        ⏳ Đang tải...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 text-lg">
        ❌ {error}
      </div>
    );

  if (!post)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg">
        Không tìm thấy bài viết
      </div>
    );

  return (
    <div className="p-4">
      <Link to="/">← Quay lại danh sách</Link>
      <h2 className="text-2xl font-bold my-2">{post.title}</h2>
      <p className="mb-4">{post.body}</p>

      <h3 className="text-xl font-semibold mt-4">Bình luận:</h3>
      <ul className="list-disc pl-6">
        {comments.map((c) => (
          <li key={c.id} className="mb-2">
            <strong>{c.email}</strong>: {c.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
