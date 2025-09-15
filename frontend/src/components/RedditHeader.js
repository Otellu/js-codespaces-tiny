import React from "react";

export default function RedditHeader() {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">r</div>
        <div>
          <div className="text-lg font-semibold">r/jsmini</div>
          <div className="text-xs text-gray-500">A tiny JS demo subreddit</div>
        </div>
      </div>
    </div>
  );
}


