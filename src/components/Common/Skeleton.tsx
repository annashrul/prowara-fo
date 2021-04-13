import React from 'react';

interface iSkeleton {
  style?: string;
}
const Skeleton: React.FC<iSkeleton> = ({ style }) => {
  return (
    <div className={style?`bg-gray-400 animate-pulse ${style}`:"bg-gray-400 animate-pulse h-4 w-full mt-1"}></div>
  );
};
export default Skeleton;
