import React from "react";
import PasswordChangeForm from "./passwordChangeForm";

const PasswordChange = () => {
  return (
    <>
      <PasswordChangeForm />
    </>
  );
};

export default PasswordChange;
 
// const bar = document.getElementById('bar');

// document.addEventListener('scroll', function(e) {

//   let scrollTop = document.documentElement.scrollTop;
//   let docHeight = document.documentElement.scrollHeight;
//   let winHeight = window.innerHeight;
//   let scrollPercent = scrollTop / (docHeight - winHeight);
//   let scrollPercentRounded = Math.round(scrollPercent * 100);

//   if (docHeight > winHeight) {
//     bar.style.width = `${scrollPercentRounded}%`;
//     console.log(scrollPercentRounded)
//   }

// //   console.log(`doc height ${docHeight}, win height: ${winHeight}`)
// });
