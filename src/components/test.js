import React from "react";

import { FirebaseContext } from "./Firebase";

const SomeComponent = () => {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => {
        return <div>i have accessed Firebase and render smth</div>;
      }}
    </FirebaseContext.Consumer>
  );
};

export default SomeComponent;
