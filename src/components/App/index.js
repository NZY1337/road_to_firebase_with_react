import React from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";

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

// https://stackoverflow.com/questions/52681342/hide-url-extensions-using-react-router-dom

const App = () => {
  return (
    <Router>
      <Layout>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path="/test" component={SomeComponent} />
        <Route path="/todos" component={Todos} />
        <Route path="/editor" component={Editor} />

        {/* blog */}
        <Route path="/edit/:type/:id" component={Editor} />
        <Route path="/blog/:id/" component={SingleBlog} />

        <Route path="/blog" exact component={Blogs} />
        {/* news */}
        <Route path="/news/:id" component={SingleBlog} />
        <Route path="/news" exact component={Blogs} />
      </Layout>
    </Router>
  );
};

{
  /* <Route
  path="/test/:id1/:id2"
  component={({ match }) => {
    return <Redirect to={{ path: "/component-route", state: { ...match.params } }} />;
  }}
/>; */
}

export default withAuthentication(App);
