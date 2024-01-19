import React from "react";
import Header from "../Partials/Header";
import Sidebar from "../Partials/Sidebar";
interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <main>
        <div className="grid grid-cols-10">
          <Sidebar className="col-span-2 border w-full min-h-screen " />
          <div className="col-span-8">
            <Header className="border w-full h-[6.5rem] flex items-center justify-between px-5 " />
            <section className="p-8">{children}</section>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageLayout;
