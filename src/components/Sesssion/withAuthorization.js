import React from 'react'
import { withRouter } from 'react-router'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'

import { AuthUserContext } from '../Sesssion'

import * as ROUTES from '../../constants/routes'

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN)
          }
        },
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) => {
            return condition(authUser) ? <Component {...this.props} /> : null
          }}
        </AuthUserContext.Consumer>
      )
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization)
}

export default withAuthorization
