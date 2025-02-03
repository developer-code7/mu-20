import React from "react";

interface TextShimmerProps {
  lines?: number;
  width?: string;
  className?: string;
}

const TextShimmer: React.FC<TextShimmerProps> = ({
  lines = 1,
  width = "w-full",
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gradient-to-r from-[#1B2537] via-[#2A3441] to-[#1B2537] rounded ${width} animate-shimmer`}
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite linear",
          }}
        />
      ))}
    </div>
  );
};

export default TextShimmer;
