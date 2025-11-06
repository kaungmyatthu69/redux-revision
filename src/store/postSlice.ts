import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";

//should move to  config file but now  just focus on redux
import axios from "axios";
import { createAppASyncThunk } from "./withType";
const BASE_URL = "http://localhost:5000/posts";
//================================

export interface Post {
  id: number;
  title: string;
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
  async (post: Pick<Post, "title">) => {
    const response = await axios.post(BASE_URL, post);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
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
      });
  },
});

export const {} = postSlice.actions;
export const selectPostsStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
