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
import { Helmet } from 'react-helmet'

// https://stackoverflow.com/questions/52681342/hide-url-extensions-using-react-router-dom

const App = ({ match }) => {
  //   console.log(props.firebase.auth.currentUser)
  const [routes, setRoutes] = useState([
    {
      path: ROUTES.LANDING,
      Component: LandingPage,
      name: 'Landing',
      exact: true,
    },

    {
      path: ROUTES.SIGN_UP,
      Component: SignUpPage,
      name: 'SignUpPage',
      exact: false,
    },

    {
      path: ROUTES.SIGN_IN,
      Component: SignInPage,
      name: 'SignInPage',
      exact: false,
    },

    {
      path: ROUTES.HOME,
      Component: HomePage,
      name: 'HomePage',
      exact: false,
    },

    {
      path: ROUTES.ACCOUNT,
      Component: AccountPage,
      name: 'AccountPage',
      exact: false,
    },

    {
      path: ROUTES.ADMIN,
      Component: AdminPage,
      name: 'AdminPage',
      exact: false,
    },

    {
      path: ROUTES.SIGN_UP,
      Component: SignUpPage,
      name: 'Sign Up Page',
      exact: false,
    },

    {
      path: ROUTES.EDITOR,
      Component: Editor,
      name: 'Editor',
      exact: false,
    },

    {
      path: ROUTES.DATA_VISUALIZATION_EDITOR,
      Component: DotsEditor,
      name: 'DotsEditor',
      exact: false,
    },

    {
      path: ROUTES.ABOUT_US,
      Component: AboutUs,
      name: 'AboutUs',
      exact: false,
    },

    {
      path: '/edit/:type/:id',
      Component: Editor,
      name: 'Editor',
      exact: false,
    },

    {
      path: '/blog/:id/:postTitle',
      Component: SingleBlog,
      name: 'SingleBlog',
      exact: false,
    },

    {
      path: '/blog',
      Component: Blogs,
      name: 'Blogs',
      exact: true,
    },

    {
      path: '/portofoliu/:id/:postTitle',
      Component: SingleBlog,
      name: 'SingleBlog',
      exact: false,
    },

    {
      path: '/portofoliu',
      Component: Blogs,
      name: 'Portofolio',
      exact: true,
    },
  ])

  return (
    <SnackBarContextProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />

        <meta
          property="og:image:secure_url"
          content="https://images.pexels.com/photos/9299384/pexels-photo-9299384.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        />

        <meta
          property="og:image"
          content="https://images.pexels.com/photos/9299384/pexels-photo-9299384.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        />

        <meta property="fb:app_id" content="587717922350472 " />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="myContent" />
        <meta property="og:title" content="myTitle" />
        <meta property="og:image" content="myImage" />
        <meta property="og:site_name" content="My Site Name" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:description" content="My Description" />
      </Helmet>

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

          {/* {routes.map(({ path, Component, exact }) => (
            <Route key={path} exact={exact} path={path}>
              {({ match }) => {
                console.log(match);
                return (
                  <CSSTransition in={match != null} timeout={300} classNames="page" unmountOnExit>
                    <div className="page">
                      <Component />
                    </div>
                  </CSSTransition>
                );
              }}
            </Route>
          ))} */}
        </Layout>
      </Router>
    </SnackBarContextProvider>
  )
}

export default withAuthentication(App)
