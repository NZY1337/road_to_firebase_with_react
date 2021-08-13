import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderContainer from "../Blog/HeaderContainer";

import { withFirebase } from "../Firebase";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

//! REACT HOOK FORM API
/*
    https://react-hook-form.com/get-started

    watch if you want to show smth into view () - type func

    -input type="number" returns a string; We can do that:
        {...register("age", { required: "This is required", valueAsNumber:true })}

*/

const url =
  "https://images.pexels.com/photos/7078501/pexels-photo-7078501.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

function AboutUs(props) {
  const [intro, setIntro] = useState({
    title: "",
    subtitle: "",
  });

  const [description, setDescription] = useState({ values: [] });

  const handleAddDescription = () => {
    setDescription((prevState) => ({ values: [...prevState.values, ""] }));
  };

  const handleRemove = (index) => {
    const values = [...description.values];

    values.splice(index, 1);
    setDescription({ values });
  };

  const renderDescription = () => {
    return description.values.map((value, index) => {
      return (
        <div key={index} style={{ display: "flex", alignItems: "flex-start" }}>
          <TextareaAutosize
            aria-label="minimum height"
            placeholder="Description..."
            defaultValue={value || ""}
            onChange={(e) => onChangeDescription(e, index)}
            style={{ width: "100%", height: "150px", padding: ".5rem", marginBottom: ".1rem" }}
          />

          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ marginLeft: "1rem" }}
            onClick={() => handleRemove(index)}
          >
            Remove
          </Button>
        </div>
      );
    });
  };

  const onChangeDescription = (e, index) => {
    let initialDescriptions = [...description.values];
    initialDescriptions[index] = e.target.value;

    setDescription({ values: initialDescriptions });
  };

  const onChangeIntro = ({ target: { name, value } }) => {
    setIntro((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const boundInputStates = { ...description.values, ...intro };
    console.log(boundInputStates);
  };

  return (
    <>
      <HeaderContainer cover={url} title="About Us" />
      <Container style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <Grid item md={5} xs={12}>
          <form onSubmit={onSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              onChange={onChangeIntro}
              defaultValue={intro.title}
              style={{ width: "100%" }}
            />

            <br />
            <br />
            <TextField
              label="Subtitle"
              name="subtitle"
              onChange={onChangeIntro}
              defaultValue={intro.subtitle}
              variant="outlined"
              style={{ width: "100%" }}
            />

            <br />
            <br />

            {renderDescription()}
            <div>
              <br />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddDescription}
                style={{ textTransform: "capitalize" }}
              >
                Add Description +
              </Button>
            </div>

            <Button style={{ marginTop: ".5rem", color: "#fff" }} variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </form>
        </Grid>
      </Container>
    </>
  );
}

export default withFirebase(AboutUs);
