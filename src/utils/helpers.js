//different helpers functions
import React, { useState, useEffect } from "react";

export const randomIndexBasedOnArrLen = (arr) => {
  let shuffled = [...arr]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
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
