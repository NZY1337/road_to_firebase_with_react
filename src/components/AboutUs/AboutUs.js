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
import { values } from "lodash";

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

  const [description, setDescription] = useState({ values: [""] });

  const sendDataToFirebase = (data) => {
    const taskRef = props.firebase.db.ref(`aboutUs`);

    taskRef
      .push(data)
      .then((value) => {
        // clear states
        setIntro({ title: "", subtitle: "" });
        setDescription((prevState) => ({ ...prevState, values: [] }));
      })
      .catch((err) => console.log(err));
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
    sendDataToFirebase(boundInputStates);
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
        // console.log(details["-Mh9waBPkpYXYp-wuaq_"]);
        setDataFromDb(details);
      } else {
        setDataFromDb({});
      }
    });
  }, []);

  useEffect(() => {
    renderDataToUx();
  }, []);

  const handleEditData = (id) => {
    const editData = dataFromDb[id];
    console.log(editData);
    const { title, subtitle, 0: description1, 1: description2, 2: description3 } = editData;
    console.log(description1, description2);

    let values = [];

    if (description1 !== undefined) {
      values = [...values, description1];
    }

    if (description2 !== undefined) {
      values = [...values, description2];
    }

    if (description3 !== undefined) {
      values = [...values, description3];
    }

    setDescription((prevState) => ({ values }));

    // setData back to State
    setIntro({ title, subtitle });
  };

  const renderDataToUx = () => {
    return Object.keys(dataFromDb).map((ID) => {
      const data = dataFromDb[ID];
      const { title, subtitle, 0: description1, 1: description2, 2: description3 } = data;

      return (
        <div key={ID} style={{ marginBottom: "1rem" }}>
          <div id={ID}>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            <p>{description1}</p>
            <p>{description2 && description2}</p>
            <p>{description3 && description3}</p>
          </div>

          <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
            <Button
              variant="contained"
              size="small"
              style={{ marginRight: "1rem" }}
              id={ID}
              onClick={handleDeleteDataFromDb}
            >
              Remove
            </Button>
            <Button variant="contained" size="small" id={ID} onClick={() => handleEditData(ID)}>
              Edit
            </Button>
          </div>
          <hr />
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
            value={value || ""}
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
