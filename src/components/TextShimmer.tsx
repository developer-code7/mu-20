import React from "react";

type TextShimmerProps = {
  lines: number | 1;
};

const TextShimmer: React.FC<TextShimmerProps> = ({ lines }) => {
  return (
    <div className="space-y-2">
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className="h-6 w-full bg-gray-50 p-4 rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default TextShimmer;
