import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const API_URL = import.meta.env.VITE_API_URL;

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  email: string;
  body: string;
}

interface PostState {
  post: Post | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  post: null,
  comments: [],
  loading: false,
  error: null,
};

// Async thunk fetch chi tiết post + comments
export const fetchPostDetail = createAsyncThunk(
  "post/fetchPostDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const postRes = await fetch(`${API_URL}/posts/${id}`);
      if (!postRes.ok) throw new Error("Không thể tải bài viết");
      const postData = await postRes.json();

      const commentsRes = await fetch(`${API_URL}/posts/${id}/comments`);
      if (!commentsRes.ok) throw new Error("Không thể tải bình luận");
      const commentsData = await commentsRes.json();

      return { post: postData, comments: commentsData };
    } catch (err: any) {
      return rejectWithValue(err.message || "Lỗi không xác định");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPost: (state) => {
      state.post = null;
      state.comments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostDetail.fulfilled,
        (state, action: PayloadAction<{ post: Post; comments: Comment[] }>) => {
          state.post = action.payload.post;
          state.comments = action.payload.comments;
          state.loading = false;
        }
      )
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPost } = postSlice.actions;
export default postSlice.reducer;
