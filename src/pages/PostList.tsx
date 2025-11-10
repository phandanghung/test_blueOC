import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postsSlice";
import type { RootState, AppDispatch } from "../store/store";
import Pagination from "../components/Pagination";

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 10;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="text-center py-20 px-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách bài đăng</h1>

      <input
        type="text"
        placeholder="Tìm kiếm bài viết..."
        value={searchTerm}
        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        className="border border-gray-300 w-1/2 mb-6"
      />

      <div className="text-start max-w-xl mx-auto">
        {currentPosts.length > 0 ? (
          currentPosts.map(post => (
            <p key={post.id} className="mb-2">
              <Link to={`/posts/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </p>
          ))
        ) : (
          <p>Không tìm thấy bài viết nào.</p>
        )}
      </div>

      {filteredPosts.length > postsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PostList;
