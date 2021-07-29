import React from "react";

import Navigation from "../Navigation";

import Footer from "../Footer/footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />

      <div>{children}</div>

      <Footer />
    </>
  );
};

export default Layout;
