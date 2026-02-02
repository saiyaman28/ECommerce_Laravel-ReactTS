import { useEffect, useState } from "react";
import api from "./axios";

/** TypeScript model */
interface Post {
  id: number;
  title: string;
  body?: string;
}

export default function App() {
  const [message, setMessage] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Test endpoint
    api.get("/test")
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => console.error(err));

    // Posts endpoint
    api.get<Post[]>("/posts")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>React + Laravel 11 API</h1>
      <p>{message}</p>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            {post.body && <p>{post.body}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
