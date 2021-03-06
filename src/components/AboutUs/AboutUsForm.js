import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const AboutUsForm = React.forwardRef(
  (
    {
      classes,
      onSubmit,
      onChangeIntro,
      intro,
      renderDescription,
      handleAddDescription,
      user,
    },
    formRef,
  ) => (
    <Container
      style={{ display: user ? 'block' : 'none' }}
      className={classes.formContainer}
    >
      <Grid item md={5} xs={12}>
        <form onSubmit={onSubmit} id="about-us-form" ref={formRef}>
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            onChange={onChangeIntro}
            value={intro.title}
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
          />

          <br />
          <br />

          {renderDescription()}

          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddDescription}
            >
              Add Description +
            </Button>
          </div>

          <Button
            style={{ marginTop: '.5rem', color: '#fff' }}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Container>
  ),
)

export default AboutUsForm
