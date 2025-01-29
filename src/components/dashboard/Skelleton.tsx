import React from "react";

const Skelleton: React.FC = () => {
  return (
    <div className="bg-[#1B2537] rounded-lg overflow-hidden animate-pulse h-full">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-[#2A3441] rounded" />
              <div className="w-24 h-4 bg-[#2A3441] rounded" />
            </div>
            <div className="w-3/4 h-6 bg-[#2A3441] rounded mb-4" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#2A3441] rounded" />
          <div className="w-48 h-4 bg-[#2A3441] rounded" />
        </div>
      </div>

      <div className="border-t border-gray-700/50 mt-auto">
        <div className="flex items-center justify-between p-4">
          <div className="w-24 h-4 bg-[#2A3441] rounded" />
          <div className="w-5 h-5 bg-[#2A3441] rounded" />
        </div>
      </div>
    </div>
  );
};

export default Skelleton;
