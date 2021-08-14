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
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

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
  const [dataFromDb, setDataFromDb] = useState({});

  const [intro, setIntro] = useState({
    title: "",
    subtitle: "",
  });

  const sendDataToFirebase = (data) => {
    const taskRef = props.firebase.db.ref(`aboutUs`);

    taskRef
      .push(data)
      .then((value) => {})
      .catch((err) => console.log(err));
  };

  const [description, setDescription] = useState({ values: [] });

  const clearDescriptionStateValuesAfterSubmit = () => {
    console.log(description.values);
  };

  const handleAddDescription = () => {
    setDescription((prevState) => ({ values: [...prevState.values, ""] }));
  };

  const handleRemove = (index) => {
    const values = [...description.values];
    values.splice(index, 1);
    setDescription({ values });
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
    // sendDataToFirebase(boundInputStates);
    setIntro({ title: "", subtitle: "" });
    clearDescriptionStateValuesAfterSubmit();
  };

  const handleDeleteDataFromDb = (e) => {
    const ID = e.currentTarget.id;
    const confirm = window.confirm("You Sure?");
    const taskRef = props.firebase.db.ref(`aboutUs`);

    if (confirm) {
      taskRef
        .child(`${ID}`)
        .remove()
        .then(() => {
          console.log("deleted successfully");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const details = props.firebase.db.ref("aboutUs");

    details.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const details = snapshot.val();
        setDataFromDb(details);
      } else {
        setDataFromDb({});
      }
    });
  }, []);

  useEffect(() => {
    renderDataToUx();
  }, [dataFromDb]);

  const renderDataToUx = () => {
    return Object.keys(dataFromDb).map((value) => {
      return (
        <div key={value}>
          <div id={value} style={{ marginBottom: "1rem" }}>
            <h1>{dataFromDb[value].title}</h1>
            <h3>{dataFromDb[value].subtitle}</h3>
            <p>{dataFromDb[value]["0"]}</p>
            <p>{dataFromDb[value]["1"] && value[1]}</p>
            <p>{dataFromDb[value]["2"] && value[2]}</p>
          </div>

          <button id={value} onClick={handleDeleteDataFromDb}>
            Remove
          </button>
          <button id={value}>Edit</button>
        </div>
      );
    });
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
            style={{ width: "100%", height: "150px", padding: ".5rem", marginBottom: "1rem" }}
          />

          <Button
            variant="outlined"
            color="secondary"
            size="small"
            style={{ marginLeft: "1rem" }}
            onClick={() => handleRemove(index)}
          >
            <RemoveCircleOutlineIcon />
          </Button>
        </div>
      );
    });
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
              value={intro.title}
              style={{ width: "100%" }}
              size="small"
            />

            <br />
            <br />
            <TextField
              label="Subtitle"
              name="subtitle"
              onChange={onChangeIntro}
              value={intro.subtitle}
              variant="outlined"
              size="small"
              style={{ width: "100%" }}
            />

            <br />
            <br />

            {renderDescription()}

            <div>
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

        <Grid>{renderDataToUx()}</Grid>
      </Container>
    </>
  );
}

export default withFirebase(AboutUs);
