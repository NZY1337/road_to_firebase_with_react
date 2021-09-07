//different helpers functions
import { useState, useEffect } from "react";

export const randomIndexBasedOnArrLen = (obj) => {
  // new obj to return
  let newObj = {};
  // create keys array
  var keys = Object.keys(obj);
  // randomize keys array
  keys.sort(function (a, b) {
    return Math.random() - 0.5;
  });
  // save in new array
  keys.forEach(function (k) {
    newObj[k] = obj[k];
  });
  return newObj;
};

export const useLazyLoading = (data) => {
  const [source, setSource] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = data.cover;
    img.onload = () => setSource(data.cover);
  }, [data.cover]);

  return source;
};
