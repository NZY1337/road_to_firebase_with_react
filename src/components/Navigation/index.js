import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

import { makeStyles } from "@material-ui/core";
import { withFirebase } from "../Firebase";

// AuthProvider
import { AuthUserContext } from "../Sesssion";
import MenuItems from "./MenuItems";
import NavWrapper from "./NavWrapper";
import NavWrapperMobile from "./NavWrapperMobile";

const Navigation = ({ firebase }) => {
  const [headerClass, setHeaderClass] = useState(false);
  const [defaultColorToDrowdown, setdefaultColorToDrowdown] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const location = useLocation();

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
          location: ROUTES.DATA_VISUALIZATION_EDITOR,
          name: "Data Visualization Editor",
          id: "data_visualization",
        },
      ],
    },

    { location: ROUTES.BLOGS, name: "Blog", auth: false, id: "blog" },
    {
      location: ROUTES.PORTFOLIO,
      name: "Portofoliu",
      auth: false,
      id: "portfoliu",
    },
    {
      location: ROUTES.ABOUT_US,
      name: "About Us",
      auth: false,
      id: "about_us",
    },
    { location: ROUTES.CONTACT, name: "Contact", auth: false, id: "contact" },
  ]);

  const authMenu = () => {
    const menu = navs.filter((nav) => nav.auth === true);

    return menu.map((nav) => {
      const { location, id, name, submenu } = nav;
      return (
        <MenuItems
          defaultColorToDrowdown={defaultColorToDrowdown}
          key={id}
          name={name}
          location={location}
          id={id}
          submenu={submenu}
        />
      );
    });
  };

  const nonAuthMenu = () => {
    const menu = navs.filter((nav) => nav.auth === false);

    return menu.map((nav) => {
      const { location, id, name } = nav;
      return <MenuItems key={id} name={name} location={location} id={id} />;
    });
  };

  const handleScrollEvent = () => {
    window.scrollY > 50 ? setHeaderClass(true) : setHeaderClass(false);
  };

  //render menu based on current viewport res
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900 ? setMobileView(true) : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);

    return () => window.removeEventListener("resize", setResponsiveness);
  }, []);

  useEffect(() => {
    handleScrollEvent();

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/editor" || pathname === "/dots-editor") {
      setdefaultColorToDrowdown(true);
    } else {
      setdefaultColorToDrowdown(false);
    }
  }, [location]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => {
        return mobileView ? (
          <NavWrapperMobile
            authUser={authUser}
            headerClass={headerClass}
            authMenu={authMenu}
            nonAuthMenu={nonAuthMenu}
            firebase={firebase}
          />
        ) : (
          <NavWrapper
            authUser={authUser}
            headerClass={headerClass}
            authMenu={authMenu}
            nonAuthMenu={nonAuthMenu}
            firebase={firebase}
          />
        );
      }}
    </AuthUserContext.Consumer>
  );
};

export default withFirebase(Navigation);
