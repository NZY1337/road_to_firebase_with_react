import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import SomeComponent from "../test";
import Todos from "../Todo";
import Editor from "../Editor";
import Blogs from "../Blog";
import SingleBlog from "../Blog/SingleBlog";
import Layout from "../Layout";
import AboutUs from "../AboutUs/AboutUs";

import { withAuthentication } from "../Sesssion";

import * as ROUTES from "../../constants/routes";

import SnackBarContextProvider from "../../utils/SnackBarContext";

// https://stackoverflow.com/questions/52681342/hide-url-extensions-using-react-router-dom

const App = () => {
  return (
    <SnackBarContextProvider>
      <Router>
        <Layout>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path="/test" component={SomeComponent} />
          <Route path="/todos" component={Todos} />
          <Route path="/editor" component={Editor} />
          <Route path={ROUTES.ABOUT_US} component={AboutUs} />

          {/* blog */}
          <Route path="/edit/:type/:id" component={Editor} />
          <Route path="/blog/:id/:postTitle" component={SingleBlog} />

          <Route path="/blog" exact component={Blogs} />
          {/* portfolio */}
          <Route path="/portfolio/:id/" component={SingleBlog} />
          <Route path="/portfolio" exact component={Blogs} />
        </Layout>
      </Router>
    </SnackBarContextProvider>
  );
};

export default withAuthentication(App);
