import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

export function Categories({ firebase }) {
  const [categories, setCategories] = useState([
    {
      categ: "design de produs",
      slug: "Design De Produs",
      id: 1,
    },
    {
      categ: "design interior",
      slug: "Design Interior",
      id: 2,
    },
    {
      categ: "pictura",
      slug: "Pictura",
      id: 3,
    },
  ]);

  useEffect(() => {

  },[])

  const renderCategories = () => {
    return (
      <ul className={`menu-categories`} style={{ listStyle: "none" }}>
        {categories.map((c) => {
          return (
            <li className={`a-c${c.id}`} key={c.id}>
              <Link>{c.slug}</Link>
            </li>
          );
        })}
      </ul>
    );
  };
  return <>{renderCategories()}</>;
}

export default withFirebase(Categories);
