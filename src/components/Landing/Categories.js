import React, { Component } from "react";
import RenderCategories from "./RenderCategories";
import { Container } from "@material-ui/core";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          id: 1,
          name: "Ocean & Oaks",
          img: "https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          description:
            "Interior designers make interior spaces functional, safe, and beautiful by determining space requirements and selecting decorative items...",
          categ: "abstract",
        },
        {
          id: 2,
          name: "Ventana Bloom",
          img: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          description:
            "To take the Big Five personality assessment, rate each statement according to how well it describes you. Base your ratings on how you really...",
          categ: "mimalistic",
        },

        {
          id: 3,
          name: "The Challenge",
          img: "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          description:
            "This free personality test gives you accurate scores for the Big Five personality traits. See exactly how you score for Openness, Conscientiousness...",
          categ: "contemporary",
        },

        {
          id: 4,
          name: "The N.Y. Kitchen",
          img: "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          description:
            "Healthcare designers use the evidence-based design process in designing and renovating healthcare centers, clinics, doctors' offices, hospitals...",
          categ: "futuristic",
        },
      ],
    };
  }

  render() {
    const items = this.state.items.map((item) => {
      return <RenderCategories key={item.id} name={item.name} img={item.img} description={item.description} />;
    });

    return (
      <Container disableGutters maxWidth={false}>
        <div className="parrent-wrapper">{items}</div>
        <div className="parrent-wrapper">{items}</div>
      </Container>
    );
  }
}

export default Categories;
