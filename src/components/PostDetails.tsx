import {
  deletePost,
  updatePost,
  type Post,
  selectPostById,
} from "@/store/postSlice";
import { Card, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

type Props = {
  id: number;
};
const PostDetails = ({ id }: Props) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => selectPostById(state, id));

  const handleEdit = ({ id, title }: { id: number; title: string }) => {
    setEditId(id);
    setEditText(title);
  };

  const handleSave = async (post: { id: number; title: string }) => {
    if (editText.trim() === "") return;
    try {
      await dispatch(updatePost({ id: post.id, title: editText })).unwrap();
    } catch (error) {
      alert("Failed to update post");
    }
    setEditId(null);
    setEditText("");
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deletePost(id)).unwrap();
    } catch (error) {
      alert("Failed to delete post");
    }
  };
  return (
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
        {editId == post.id ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleSave(post)}
          >
            Save
          </Button>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleEdit(post)}
          >
            Edit
          </Button>
        )}
        <Button
          onClick={() => handleDelete(post.id)}
          size="sm"
          variant="destructive"
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default PostDetails;
