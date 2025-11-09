import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect, useState } from "react";
import {
  fetchPosts,
  addPost,
  selectAllPosts,
  selectPostByUserId,
  selectPostIds
} from "@/store/postSlice";
import { Input } from "@/components/ui/input";
import PostDetails from "@/components/PostDetails";
function PostList() {
  const [newPost, setNewPost] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  // const { status, error } = useAppSelector((state) => state.posts);
  const status = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);
  // const posts = useAppSelector(selectAllPosts);
  // const posts = useAppSelector((state) => selectPostByUserId(state, 2));
const postIds = useAppSelector(selectPostIds)
  const handleAddPost = async () => {
    if (newPost.trim() === "") return;
    setLoading(true);
    try {
      await dispatch(addPost({ title: newPost, userId: 2 })).unwrap();
    } catch (error) {
      alert("Failed to add new post");
    } finally {
      setLoading(false);
    }
    setNewPost("");
  };

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch]);
  return (
    <>
      <h1 className="font-bold text-2xl mb-5">Post Managers</h1>
      <div className="flex  gap-2 ">
        <Input
          placeholder="Write a new post "
          value={newPost}
          onChange={(e) => {
            setNewPost(e.target.value);
          }}
        />
        <Button onClick={handleAddPost} disabled={loading}>
          {loading ? "Loading..." : "Add"}
        </Button>
      </div>
      {error && <div>Error : {error}</div>}
      {status == "loading" ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-5 mt-5">
          {postIds.map((id:number) => (
            <PostDetails key={id} id={id} />
          ))}
        </div>
      )}
    </>
  );
}

export default PostList;
