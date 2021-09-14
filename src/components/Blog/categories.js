import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

export function Categories({ firebase }) {
  //   const [portfolioByCateg, setPortfolioByCateg] = useState(null);
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

  //   useEffect(() => {
  //     const ref = firebase.db.ref("portofoliu");

  //     ref.on("value", (snapshot) => {
  //       if (snapshot.val() !== null) {
  //         let portfolioByCateg = snapshot.val();
  //         console.log(portfolioByCateg);
  //         setPortfolioByCateg(portfolioByCateg);
  //       }
  //     });

  //     return () => {
  //       ref.off("value");
  //     };
  //   }, []);

  const renderCategories = () => {
    return (
      <ul className={`menu-categories`} style={{ listStyle: "none" }}>
        {categories.map((c) => {
          return (
            <li className={`a-c${c.id}`} key={c.id}>
              <Link
                to={{
                  pathname: "/portofoliu",
                  categ: c.categ,
                }}
              >
                {c.slug}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };
  return <>{renderCategories()}</>;
}

export default withFirebase(Categories);
