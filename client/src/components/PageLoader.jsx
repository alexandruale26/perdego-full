import { useEffect, useState } from "react";

const PageLoader = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const headerHeight = document.querySelector("header").clientHeight;
    const footerHeight = document.querySelector("footer").clientHeight;

    setOffset(headerHeight + footerHeight);
  }, []);

  return (
    <div
      className="w-full max-w-[1200px] h-full flex items-center justify-center mx-auto"
      style={{ minHeight: `calc(100vh - ${offset}px)` }}
    >
      <div className="page-loader" />
    </div>
  );
};

export default PageLoader;
