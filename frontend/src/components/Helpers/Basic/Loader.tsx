import React from "react";

type LoaderProps = {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({className}) => {
  return (
    <>
      <div className={`w-full h-[60vh] flex items-center justify-center ${className}`}>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </>
  );
};

export default Loader;
