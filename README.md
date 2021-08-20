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

[1,2,3,4,5];
[2,3,4,5,1];
[2,4,3,1,5]

- two times in a row with the same indexes;
- on Load send first item's index to LS;
- on rerender check the first item's id and comppare to the current first item's id
- if the same swap their pos again [arr[first], arr[second]] = [arr[second], arr[first]];
