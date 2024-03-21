'use client'
import React, { useState } from "react";
import Header from "../global/layout/Header";
import Sidebar from "../global/layout/Sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
}
// style={{ zoom: "80%" }}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  // max-sm:hidden max-md:hidden 
  return (
    <>
      <main>
          <div className="h-screen">
            <Header onClick={handleToggle} />
            <div className="flex">
             <Sidebar className={`hide-scrollbar shadow-lg border-r w-2/6 overflow-y-auto overflow-x-hidden z-10 ${!isExpanded ? 'hidden transition duration-700 ease-in-out' : 'max-tmp:absolute max-tmp:bg-white  max-md:w-2/4 max-sm:w-2/3 max-xs:w-full'}`} />
              <section
                style={{ height: "calc(100vh - 3.5rem)" }}
                className="hide-scrollbar w-full overflow-y-auto bg-white p-5"
              >
                {children}
              </section>
            </div>
          </div>
      </main>
    </>
  );
};

export default PageLayout;
