import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { hydrate, render } from 'react-dom'

import Firebase, { FirebaseContext } from './components/Firebase'
const MyApp = (
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
)
const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  hydrate(MyApp, rootElement)
} else {
  render(MyApp, rootElement)
}
