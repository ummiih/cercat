import React, { useState } from 'react';

interface StickGraphProps {
  height: number | null;
  color: string;
}

const StickGraph: React.FC<StickGraphProps> = ({ height, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverColor = 'primary';

  return (
    <div
      style={{
        height:
          height !== null
            ? `${Math.min(height, 132)}%` // 최대 132%로 제한
            : 'auto',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-[20%] mt-auto bg-${isHovered ? hoverColor : color} rounded-t-full`}>
      {height != null && isHovered && (
        <div>
          <div
            className={
              'absolute bottom-full left-1/2 transform -translate-x-1/2 text-white px-[80%] bg-black rounded-lg mb-[40%]'
            }
            style={{ zIndex: 1, marginTop: '10px' }}>
            {height}
          </div>
        </div>
      )}
    </div>
  );
};

export default StickGraph;
