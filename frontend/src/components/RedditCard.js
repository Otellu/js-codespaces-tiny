import React from "react";
import { Post } from "../../../backend/src/models";

export default function RedditCard({ title, votes, username,handleUpvoke }) {
  
  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="flex">
        <div className="w-14 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-center py-3">
          <button onClick={() => handleUpvoke(key, votes)}> upvote</button>
        </div>
        <div className="w-14 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-center py-3">
          <div className="text-sm font-semibold text-gray-700">{votes}</div>
        </div>
        <div className="flex-1 p-4">
          <div className="text-xs text-gray-500 mb-1">Posted by {username} in r/jsmini</div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      </div>
    </div>
  );
}


