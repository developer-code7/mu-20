import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-4", // Fixed border-3 (not available in Tailwind)
    lg: "w-12 h-12 border-8",
  };

  const spinner = (
    <div
      className={`${sizeClasses[size]} border-4 border-transparent border-t-[#FF5722] rounded-full animate-spin`}
    ></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#0F1729]/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1B2537] p-8 rounded-lg shadow-xl flex flex-col items-center gap-4">
          {spinner}
        </div>
      </div>
    );
  }

  return <div className="flex items-center justify-center p-4">{spinner}</div>;
};

export default Loader;
