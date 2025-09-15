import React, { useEffect, useState } from "react";
import RedditCard from "./components/RedditCard";
import RedditHeader from "./components/RedditHeader";
import RedditSidebar from "./components/RedditSidebar";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic API URL constructor with Codespaces support
  const getApiUrl = () => {
    // Check if running in Codespaces environment
    if (
      process.env.REACT_APP_CODESPACES === "true" &&
      process.env.REACT_APP_CODESPACE_NAME
    ) {
      const domain =
        process.env.REACT_APP_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN ||
        "app.github.dev";
      return `https://${process.env.REACT_APP_CODESPACE_NAME}-8081.${domain}/api`;
    }

    // Use environment variable or fallback to localhost
    return process.env.REACT_APP_API_URL || "http://localhost:8081/api";
  };

  const API_URL = getApiUrl();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/posts`);
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load posts", e);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <RedditHeader />
      <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6">
        <div className="flex-1 space-y-4">
          {loading && <div>Loading...</div>}
          {!loading &&
            posts.map((post) => (
              <RedditCard
                key={post._id}
                title={post.title}
                votes={post.votes || "-"}
                username={post.username}
              />
            ))}
          {!loading && posts.length === 0 && (
            <div className="bg-white rounded-md border border-gray-200 p-4">
              No posts yet. Did you run <code>npm run db:init</code>?
            </div>
          )}
        </div>
        <RedditSidebar />
      </div>
    </div>
  );
}

export default App;
