import React from "react";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <>
      <h3>Layout</h3>
      <div>{children}</div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
