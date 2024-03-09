'use client'
import React, { Suspense, useState } from "react";
import Header from "../global/layout/Header";
import Sidebar from "../global/layout/Sidebar";
import Loading from "./Loading";

interface PageLayoutProps {
  children: React.ReactNode;
}
// style={{ zoom: "80%" }}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <main>
        <Suspense fallback={<Loading />}>
          <div className="h-screen">
            <Header onClick={handleToggle} />
            <div className="flex">
             <Sidebar className={`hide-scrollbar shadow-lg border-r w-2/6 overflow-y-auto overflow-x-hidden ${!isExpanded ? 'hidden transition duration-700 ease-in-out' : 'max-sm:hidden max-md:hidden'}`} />
              <section
                style={{ height: "calc(100vh - 3.5rem)" }}
                className="hide-scrollbar w-full overflow-y-auto bg-white p-5"
              >
                {children}
              </section>
            </div>
          </div>
        </Suspense>
      </main>
    </>
  );
};

export default PageLayout;
