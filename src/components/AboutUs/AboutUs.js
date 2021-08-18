import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderContainer from "../Blog/HeaderContainer";

import AboutUsFacts from "./AboutUsFacts";
import { withFirebase } from "../Firebase";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { makeStyles } from "@material-ui/core";
import RandomTitle from "../../utils/RandomTitle";

const url =
  "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: "5rem",
    marginBottom: "5rem",
    // display: "none",
  },
  designImg: {
    objectFit: "cover",
    width: "100%",
    minHeight: "500px",
    borderRadius: "0% 100% 50% 50% / 100% 0% 100% 0%",
    src: "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  aboutUsContainer: {
    collor: "white",
    backgroundColor: "#000",
    paddingTop: "4rem",
    paddingBottom: "4rem",
  },
}));

//! REACT HOOK FORM API
/*
    https://react-hook-form.com/get-started

    watch if you want to show smth into view () - type func

    -input type="number" returns a string; We can do that:
        {...register("age", { required: "This is required", valueAsNumber:true })}

*/

function AboutUs(props) {
  // state
  const [dataFromDb, setDataFromDb] = useState({});
  const [itemIdToBeEdited, setItemIdToBeEdited] = useState("");
  const classes = useStyles();
  const [intro, setIntro] = useState({
    title: "",
    subtitle: "",
  });
  const [description, setDescription] = useState({ values: [""] });

  const sendDataToFirebase = (data) => {
    const taskRef = props.firebase.db.ref("aboutUs");

    if (itemIdToBeEdited) {
      taskRef
        .child(itemIdToBeEdited)
        .update(data)
        .then((value) => {
          setIntro({ title: "", subtitle: "" });
          setDescription((prevState) => ({ ...prevState, values: [] }));
          console.log("items updated successfully");
          setItemIdToBeEdited(null);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      taskRef
        .push(data)
        .then((value) => {
          // clear states
          setIntro({ title: "", subtitle: "" });
          setDescription((prevState) => ({ ...prevState, values: [] }));
        })
        .catch((err) => console.log(err));
    }
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
    console.log(id);
    setItemIdToBeEdited(id);
    const editData = dataFromDb[id];
    console.log(editData);
    const { title, subtitle, 0: description1, 1: description2, 2: description3 } = editData;

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
        <>
          <AboutUsFacts
            key={ID}
            title={title}
            subtitle={subtitle}
            description1={description1}
            description2={description2}
            description3={description3}
            handleEditData={handleEditData}
            ID={ID}
            handleDeleteDataFromDb={handleDeleteDataFromDb}
          />
        </>

        //   <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
        //     <Button
        //       variant="contained"
        //       size="small"
        //       style={{ marginRight: "1rem" }}
        //       id={ID}
        //       onClick={handleDeleteDataFromDb}
        //     >
        //       Remove
        //     </Button>
        //     <Button variant="contained" size="small" id={ID} onClick={() => handleEditData(ID)}>
        //       Edit
        //     </Button>
        //   </div>
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
      <HeaderContainer
        cover={url}
        title="About Us"
        description="The BrandNu Design and Hip Hop Architecture Camp founder sits in his remixed version of an Eames lounge chair and ottoman outside the State Capitol in Madison, Wisconsin. Photography by Hedi Lamar Photography."
      />

      <Container className={classes.formContainer}>
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
      </Container>

      <Container maxWidth="xl" className={classes.aboutUsContainer}>
        <Container maxWidth="xl">
          <Grid container justify="space-between">
            <Grid md="3">
              <img className={classes.designImg} src={url} />

              <Typography color="aqua" variant="h4" component="h1" style={{ color: "white", marginBottom: "1rem" }}>
                esign
              </Typography>
            </Grid>

            <Grid md="8">
              <Grid container justify="space-between">
                <Grid md="6" style={{ padding: "1rem" }}>
                  <Typography
                    color="primary"
                    variant="h1"
                    component="h1"
                    style={{ color: "white", marginBottom: "1rem" }}
                  >
                    Our Beliefs
                  </Typography>
                </Grid>

                {renderDataToUx()}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default withFirebase(AboutUs);
