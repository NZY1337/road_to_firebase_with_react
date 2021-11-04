import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import HomePage from '../Home'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import Editor from '../Editor'
import Blogs from '../Blog'
import SingleBlog from '../Blog/SingleBlog'
import Layout from '../Layout'
import AboutUs from '../AboutUs/AboutUs'
import DotsEditor from '../DotsEditor'
import Contact from '../Contact/Contact'
import { withAuthentication } from '../Sesssion'

import * as ROUTES from '../../constants/routes'
import './animation.scss'
import SnackBarContextProvider from '../../utils/SnackBarContext'
import ScrollToTop from '../../utils/ScrollTop/ScrollToTop'

import { hydrate, render } from 'react-dom'
// https://stackoverflow.com/questions/52681342/hide-url-extensions-using-react-router-dom
const rootElement = document.getElementById('root')

const App = ({ match }) => {
  return (
    <SnackBarContextProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />

          <Route path={ROUTES.EDITOR} component={Editor} />
          <Route
            path={ROUTES.DATA_VISUALIZATION_EDITOR}
            component={DotsEditor}
          />

          <Route path={ROUTES.ABOUT_US} component={AboutUs} />
          <Route path={ROUTES.CONTACT} component={Contact} />
          <Route path="/edit/:type/:id" component={Editor} />
          <Route path="/blog/:id/:postTitle" component={SingleBlog} />
          <Route path="/blog" exact component={Blogs} />

          <Route path="/portofoliu/:id/:postTitle" component={SingleBlog} />
          <Route path="/portofoliu" exact component={Blogs} />
        </Layout>
      </Router>
    </SnackBarContextProvider>
  )
}

export default withAuthentication(App)
