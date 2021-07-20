import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LANDING, SIGN_UP } from "../../constants/routes";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForget from "../PasswordForgot";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import SomeComponent from "../test";
import Todos from "../Todo";
import Editor from "../Editor";
import Blogs from "../Blog";
import SingleBlog from "../Blog/SingleBlog";
import Layout from "../Layout";

import { withAuthentication } from "../Sesssion";

import * as ROUTES from "../../constants/routes";

const App = () => {
  return (
    <Router>
      <Layout>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.EDITOR} component={Editor} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path="/test" component={SomeComponent} />
        <Route path="/todos" component={Todos} />
        <Route path="/blog/:id" component={SingleBlog} />
        <Route path="/blog" exact component={Blogs} />
      </Layout>
    </Router>
  );
};

export default withAuthentication(App);
