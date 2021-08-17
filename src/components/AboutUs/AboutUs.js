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
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

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
    const taskRef = props.firebase.db.ref(`aboutUs`);

    if (itemIdToBeEdited) {
      taskRef
        .child(itemIdToBeEdited)
        .update()
        .then((value) => {
          setIntro({ title: "", subtitle: "" });
          setDescription((prevState) => ({ ...prevState, values: [] }));
          console.log("items updated successfully");
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
      <HeaderContainer
        cover={url}
        title="About Us"
        description="The BrandNu Design and Hip Hop Architecture Camp founder sits in his remixed version of an Eames lounge chair and ottoman outside the State Capitol in Madison, Wisconsin. Photography by Hedi Lamar Photography."
      />

      <Container
        style={{
          marginTop: "5rem",
          marginBottom: "5rem",
          display: "none",
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
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

      <Container
        maxWidth="xl"
        // disableGutters={true}
        style={{ collor: "white", backgroundColor: "#000", paddingTop: "4rem", paddingBottom: "4rem" }}
      >
        <Container maxWidth="xl">
          <Grid container justify="space-between">
            <Grid md="3">
              <img
                src="https://images.unsplash.com/photo-1629082993578-bcbadf9713a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  minHeight: "500px",
                  borderRadius: "0% 100% 50% 50% / 100% 0% 100% 0%",
                }}
              />

              <Typography color="aqua" variant="h4" component="h1" style={{ color: "white", marginBottom: "1rem" }}>
                esign
              </Typography>
            </Grid>

            <Grid md="8">
              <Grid container>
                <Grid md="5" style={{ padding: "1rem" }}>
                  <Typography
                    color="primary"
                    variant="h1"
                    component="h1"
                    style={{ color: "white", marginBottom: "1rem" }}
                  >
                    Our Beliefs
                  </Typography>
                  <Typography color="primary" variant="body" component="p" style={{ color: "white" }}>
                    The BrandNu Design and Hip Hop Architecture Camp founder sits in his remixed version of an Eames
                    lounge chair and ottoman outside the State Capitol in Madison, Wisconsin.
                  </Typography>
                </Grid>

                <Grid md="5" style={{ marginTop: "3rem", padding: "1rem" }}>
                  <Typography variant="h6" component="h6" style={{ color: "aqua", marginBottom: ".5rem" }}>
                    POVESTEA MEA
                  </Typography>

                  <Typography variant="body2" style={{ color: "white" }}>
                    Salut, numele meu este Răzvan Puricescu, sunt designer de interior și de produs cu o experiență de
                    peste 10 ani în domeniu. Născut pe 11 iunie 1986 in Piatra Neamț (Romania) am avut inclinație
                    artistica încă din adolescenta, făcând liceul de arte Victor Brauner. Mai târziu am studiat designul
                    urmând facultatea și masterul la Universitatea de Arte George Enescu din Iași secția design
                    industrial. Sunt fondatorul unei companii de design coaching Designer’s Compass și autorul cărții
                    “Tu, clientul tău” împreună cu partenerul și bunul meu prieten Paul Chetroşanu.
                  </Typography>
                </Grid>

                <Grid md="5" style={{ marginTop: "3rem", padding: "1rem" }}>
                  <Typography variant="h6" component="h6" style={{ color: "aqua", marginBottom: ".5rem" }}>
                    IDENTITATEA MEA CA DESIGNER
                  </Typography>

                  <Typography variant="body2" style={{ color: "white" }}>
                    Salut, numele meu este Răzvan Puricescu, sunt designer de interior și de produs cu o experiență de
                    peIdentitatea este esența oricărui designer. De ce? Pentru că aceasta îi dă stilul, liniile,
                    opțiunea cromatică și modalitatea de execuție. În cazul meu, identitatea în design se poate vedea
                    prin simplitatea liniilor și stilul modern minimalist. Sunt fascinat de simplitate, oriunde o
                    regăsesc, fie că este o locuință sau un produs. A spune multe prin puține obiecte sau linii este cea
                    mai mare provocare pe care o am la fiecare proiect in parte.
                  </Typography>
                </Grid>

                <Grid md="5" style={{ marginTop: "3rem", padding: "1rem" }}>
                  <Typography variant="h6" component="h6" style={{ color: "aqua", marginBottom: ".5rem" }}>
                    CE FEL DE DESIGN ABORDEZ
                  </Typography>

                  <Typography variant="body2" style={{ color: "white" }}>
                    Dacă ești o persoană căreia îi place designul modern, simplu, minimalist, atunci te afli în locul
                    potrivit. Pentru a excela într-un domeniu, oricare ar fi el, trebuie să faci doar câteva lucruri,
                    dar foarte bine. Aceeași regulă se aplică și în cazul designului. O perioadă îndelungată am făcut
                    orice fel de proiect pentru orice fel de client, iar acest lucru îmi coroda identitatea, cu fiecare
                    proiect făcut, în alte stiluri decât cel care mă reprezintă și am ales să nu mai fac un asemenea
                    compromis. În concluzie, dacă nu ești atras de stilul modern, îți pot recomanda alți designeri
                    foarte buni, pe stilul tău preferat.
                  </Typography>
                </Grid>

                <Grid md="10" style={{ marginTop: "3rem", padding: "1rem" }}>
                  <Typography variant="h6" component="h6" style={{ color: "aqua", marginBottom: ".5rem" }}>
                    CUM LUCRAM IMPREUNA
                  </Typography>

                  <Typography variant="body2" style={{ color: "white" }}>
                    a) Față în față. Stabilim telefonic o întâlnire și ne putem vedea la o cafea, unde putem discuta în
                    detaliu ideile tale și cum le putem transforma într-un proiectul de design deosebit. b) Online.
                    Pentru o comunicare sănătoasă și sigură folosește formularul dedicat, din secțiunea contact unde
                    poți descrie în câteva cuvinte ceea ce dorești să realizăm împreună. După caz, poți atașa și imagini
                    cu ideile tale, fie că sunt schițe (mâzgăleli) sau poze reale. După ce analizez informațiile pe care
                    mi le trimiți te contactez telefonic și dezvoltam împreună un plan pentru proiectul dorit. c)
                    Consultanță pe teren. Pentru cazuri în care este necesară o consultanță pe teren (casă, birou,
                    grădină etc.) - cu soluții oferite la fața locului - stabilim telefonic în prealabil detalii precum
                    oră, locație, tarif.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default withFirebase(AboutUs);
