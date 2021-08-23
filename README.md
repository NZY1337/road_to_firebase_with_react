### INITIALIZE FIREBASE APP ./Firebase

    - create firebase component and initialize the app in constructor;
    - create all user's methods for handling different actions (login, signup/in, etc.);
    - export Firebase Component;

### `create firebase context:`

    - create the firebaseContext and export it;
    - in ./index.js wrapp the entire app with the FirebaseContext. The FirebaseContext's value will be the initialization of the firebase component;
    - create the Firebase HOC - withFirebase - this HOC will be used in all components that        require an user action - for simplicity; without HOC firebaseContext would've been imported everytime - but we don't want to duplicate this;
    - in the firebaseHOC import the firebaseContext, wrapp Component with FirebaseContext and export it;

### AUTH USER CONTEXT

    - create AuthUserContext - it'll be used when a component should know the user's authenticated state
    - create withAuthentication HOC; this uses withFirebase hook because we want to have acces to the onAuthStateChanged func
    - now ./App.js will be exported with withAuthentication HOC - every component within App.js
    will consume the authUser from AuthUserContext;

https://reactjsexample.com/tag/images/

// GSAP
// https://codepen.io/GreenSock/pen/obdMzZ
// https://codepen.io/GreenSock/pen/lEiAv
// https://codepen.io/GreenSock/pen/EqCtL
// https://greensock.com/react/

// currentTarget vs target
// https://www.youtube.com/watch?v=M23X3zzIawA
// https://www.youtube.com/watch?v=GvyHQi69gqM
// https://github.com/mui-org/material-ui/issues/5085
// https://codesandbox.io/s/react-quilljsbasic-wm0uk?file=/src/App.js
// https://www.carlrippon.com/event-target-v-current-target/
