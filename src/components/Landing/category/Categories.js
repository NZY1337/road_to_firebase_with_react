import React, { useState, useEffect } from "react";
import RenderCategories from "./SingleCategoryItem";
import { Container } from "@material-ui/core";
import { withFirebase } from "../../Firebase";

const Categories = ({ firebase }) => {
  const [portfolios, setPortfolios] = useState(null);

  const fetchPortfolioItems = () => {
    const portfolioRef = firebase.db.ref("portofoliu");

    portfolioRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let portfolios = snapshot.val();
        setPortfolios(portfolios);
      } else {
      }
    });
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const renderItems = () => {
    return Object.keys(portfolios).map((id) => {
      const item = portfolios[id];

      return <RenderCategories item={item} id={id} />;
    });
  };

  return (
    <Container disableGutters maxWidth={false}>
      <div className="parrent-wrapper">{portfolios && renderItems()}</div>
    </Container>
  );
};

export default withFirebase(Categories);
