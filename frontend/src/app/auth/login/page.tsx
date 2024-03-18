import dynamic from "next/dynamic";
import React from "react";
const HeroLoginPage = dynamic(() => import("@/components/JuidcoFinance/page/auth/Index"), {
  ssr: false, 
});

const LoginPage = () => {
  return <HeroLoginPage />;
};

export default LoginPage;
