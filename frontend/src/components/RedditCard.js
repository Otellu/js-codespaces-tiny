import React, { useCallback, useEffect, useState } from "react";

export default function RedditCard({ id, title, votes, username }) {
  const [upvote, setUpvote] = useState(false);

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

  function upvotePost() {
    async function fetchPosts() {
      try {
        setUpvote(!upvote);
        const res = await fetch(
          `${API_URL}/posts/${id}?state=${upvote ? "upvote" : "downvote"}`,
          { method: "PATCH" }
        );
        const data = await res.json();
        console.log({ data });
      } catch (e) {
        console.error("Failed to upvote posts", e);
        setUpvote(false);
      } finally {
      }
    }
    fetchPosts();
  }

  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="flex">
        <div className="w-14 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-center py-3">
          <div className="text-sm font-semibold text-gray-700 flex flex-col items-center">
            <button
              type="button"
              className={`${upvote ? "text-orange-600" : "text-gray-700"}`}
              onClick={() => upvotePost()}
            >
              +
            </button>
            <div>{upvote ? votes + 1 : votes}</div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="text-xs text-gray-500 mb-1">
            Posted by {username} in r/jsmini
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      </div>
    </div>
  );
}
