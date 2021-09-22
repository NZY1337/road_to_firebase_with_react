import React, { useState, useEffect } from "react";

import HeaderContainer from "../Blog/HeaderContainer";

export function DotsEditor() {
  return (
    <>
      <HeaderContainer
        style={{ marginTop: "5rem" }}
        cover="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        title="Data Visualization Editor"
        description="A visualization of the most important detatails from an interior design creation."
      />
    </>
  );
}

export default DotsEditor;
