import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./index";

//should move to  config file but now  just focus on redux
import axios from "axios";
import { createAppASyncThunk } from "./withType";
const BASE_URL = "http://localhost:5000/posts";
//================================

export interface Post {
  id: number;
  title: string;
  userId: number;
}
interface PostState {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostState = {
  items: [],
  status: "idle",
  error: null,
};

//types:'posts/fetchposts' , will create actions
export const fetchPosts = createAppASyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get(BASE_URL);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response.data;
  },
  {
    //prevent duplicate api call
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState());
      if (postsStatus !== "idle") {
        return false;
      }
    },
  }
);

export const addPost = createAppASyncThunk(
  "posts/addPost",
  async (post: Omit<Post, "id">) => {
    const response = await axios.post(BASE_URL, post);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response.data;
  }
);

export const updatePost = createAppASyncThunk(
  "posts/updatePost",
  async (post: Partial<Post>) => {
    const response = await axios.patch(`${BASE_URL}/${post.id}`, post);
    return response.data;
  }
);

export const deletePost = createAppASyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  // selectors: {
  //   selectAllPosts: (state) => state.items,
  //   selectPostByUserId: (state, userId: number) => {
  //     return state.items.filter((post) => post.userId === userId);
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.items = action.payload;
        state.items.push(...action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add post";
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.items.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update post";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete post";
      });
  },
});

export const {} = postSlice.actions;
// export const { selectAllPosts, selectPostByUserId } = postSlice.selectors;
export const selectPostsStatus = (state: RootState) => state.posts.status;

export const selectAllPosts = (state: RootState) => state.posts.items;
export const selectPostByUserId = createSelector(
  [selectAllPosts, (state: RootState, userId) => userId],
  (posts, userId) => {
    return posts.filter((post) => post.userId === userId);
  }
);

export default postSlice.reducer;
