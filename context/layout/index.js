import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext({
  pageTitle: "",
  setPageTitle: () => {},
});

export const LayoutProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState("");

  const value = {
    pageTitle,
    setPageTitle,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLayout = () => useContext(Context);
