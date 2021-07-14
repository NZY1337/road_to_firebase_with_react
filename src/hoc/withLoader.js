import React from "react";
import Container from "@material-ui/core/Container";

const withLoader = (Component) => {
  class WithLoader extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        counter: 0,
        loadingText: "Loading",
      };
    }

    displayLoader = () => {
      console.log("test");
      if (this.state.counter === 3) {
        this.setState((prevState) => {
          return {
            ...prevState,
            counter: -1,
            loadingText: "Loading ",
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            ...prevState,
            loadingText: (prevState.loadingText += " ."),
          };
        });
      }

      this.setState((prevState) => {
        return {
          ...prevState,
          counter: prevState.counter + 1,
        };
      });
    };

    setLoaderState = (loading) => {
      this.setState({ loading: loading });
    };

    componentDidMount() {
      this.interval = setInterval(this.displayLoader, 100);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return (
        <Container maxWidth="lg">
          {/* {this.state.loading && (
            <p>
              <b>{this.state.loadingText}</b>
            </p>
          )} */}
          <Component
            loadingText={this.state.loadingText}
            loading={this.state.loading}
            {...this.props}
            setLoaderState={this.setLoaderState}
            loaderInterval={this.interval}
          />
        </Container>
      );
    }
  }

  return WithLoader;
};

export default withLoader;
