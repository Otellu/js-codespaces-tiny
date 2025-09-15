import React from "react";

export default function RedditSidebar() {
  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <div className="h-16 bg-orange-500" />
        <div className="p-4">
          <div className="font-semibold mb-1">About Community</div>
          <p className="text-sm text-gray-600">
            r/mernmini is a demo subreddit for a tiny MERN upvote example.
          </p>
        </div>
      </div>
    </aside>
  );
}


