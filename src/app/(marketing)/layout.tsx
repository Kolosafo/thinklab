import React from "react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import MobileNav from "@/components/mobile-nav";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MobileNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MarketingLayout;
