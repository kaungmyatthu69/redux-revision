import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect, useState } from "react";
import { fetchPosts, addPost } from "@/store/postSlice";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "./components/ui/card";
function App() {
  const [newPost, setNewPost] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.posts);

  const handleEdit = ({ id, title }: { id: number; title: string }) => {
    setEditId(id);
    setEditText(title);
  };

  const handleAddPost = async () => {
    if (newPost.trim() === "") return;
    setLoading(true);
    try {
      await dispatch(addPost({ title: newPost })).unwrap();
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
    <div className=" flex justify-center items-center mt-10 flex-col">
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
          {items.map((post) => (
            <Card className="w-60 px-3 py-2!" key={post.id}>
              {editId === post.id ? (
                <Input
                  value={editText}
                  onChange={(e) => {
                    setEditText(e.target.value);
                  }}
                />
              ) : (
                <CardTitle>{post.title}</CardTitle>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
