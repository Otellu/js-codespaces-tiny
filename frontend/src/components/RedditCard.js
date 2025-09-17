import React from "react";

export default function RedditCard({ id, title, votes, username }) {
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

  const onHandleUpvote = async () => {
    const upvote = await fetch(`${API_URL}/upvote?id=${id}`, {
      body: {
        upvote: 1,
      },
      method: "PATCH",
    });

    if (!upvote.ok) {
      throw new Error("There is something wrong when upvoting");
    }

    console.log(upvote.json());
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="flex">
        <div className="w-14 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-center py-3">
          <button onClick={onHandleUpvote}>Upvote</button>
          <div className="text-sm font-semibold text-gray-700">{votes}</div>
        </div>
        <div className="flex-1 p-4">
          <div className="text-xs text-gray-500 mb-1">
            Posted by {username} in r/jsmini {id}
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      </div>
    </div>
  );
}
