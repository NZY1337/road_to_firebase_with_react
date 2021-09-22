import React, { useState, useEffect } from "react";

import * as ROUTES from "../../constants/routes";

import { makeStyles } from "@material-ui/core";
import { withFirebase } from "../Firebase";

// AuthProvider
import { AuthUserContext } from "../Sesssion";
import MenuItems from "./MenuItems";
import NavWrapper from "./NavWrapper";

const useStyles = makeStyles((theme) => ({
  bgClass1: {
    "&.MuiPaper-root": {
      backgroundColor: "rgba(0,0,0, 1)",
      transition: "background-color .5s",
    },
  },

  bgClass2: {
    "&.MuiPaper-root": {
      backgroundColor: "transparent",
      transition: "background-color .5s",
    },
  },

  header: {
    "&.MuiPaper-root": {
      padding: "1rem",
    },

    "& a": {
      textDecoration: "none",
    },

    "& .MuiTypography-root": {
      fontWeight: "bold",
    },
  },

  logo: {
    border: "2px dotted aqua",
    borderRadius: "50%",
    display: "flex",
    width: "50px",
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
}));

const Navigation = ({ firebase }) => {
  const [headerClass, setHeaderClass] = useState(false);

  const classes = useStyles();
  const [navs, setNavs] = useState([
    {
      location: ROUTES.LANDING,
      name: "Home",
      auth: false,
      id: "home",
    },
    { location: ROUTES.SIGN_UP, name: "Register", auth: false, id: "register" },
    { location: ROUTES.SIGN_IN, name: "Sign In", auth: false, id: "sign_in" },
    { location: ROUTES.ACCOUNT, name: "Account", auth: true, id: "account" },
    {
      location: "#",
      name: "Editors",
      auth: true,
      id: "editors",
      submenu: [
        {
          location: ROUTES.EDITOR,
          name: "Blog Editor",
          id: "blog_editor",
        },

        {
          location: ROUTES.DOTS_EDITOR,
          name: "Dots Editor",
          id: "dots_editor",
        },
      ],
    },
    { location: ROUTES.BLOGS, name: "Blog", auth: false, id: "blog" },
    { location: ROUTES.PORTFOLIO, name: "Portofoliu", auth: false, id: "portfoliu" },
    { location: ROUTES.ABOUT_US, name: "About Us", auth: false, id: "about_us" },
  ]);

  const authMenu = () => {
    const menu = navs.filter((nav) => nav.auth === true);

    return menu.map((nav) => {
      const { location, id, name, submenu } = nav;

      return <MenuItems name={name} location={location} id={id} submenu={submenu} />;
    });
  };

  const nonAuthMenu = () => {
    const menu = navs.filter((nav) => nav.auth === false);

    return menu.map((nav) => {
      const { location, id, name } = nav;
      return <MenuItems name={name} location={location} id={id} />;
    });
  };

  const handleScrollEvent = () => {
    window.scrollY > 50 ? setHeaderClass(true) : setHeaderClass(false);
  };

  useEffect(() => {
    handleScrollEvent();

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <NavWrapper
          authUser={authUser}
          classes={classes}
          headerClass={headerClass}
          authMenu={authMenu}
          nonAuthMenu={nonAuthMenu}
          firebase={firebase}
        />
      )}
    </AuthUserContext.Consumer>
  );
};

export default withFirebase(Navigation);
