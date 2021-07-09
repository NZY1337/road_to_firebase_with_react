import React from "react";

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
      this.setState((prevState) => {
        return {
          ...prevState,
          loading: loading,
        };
      });
    };

    componentDidMount() {
      this.interval = setInterval(this.displayLoader, 100);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return (
        <>
          {this.state.loading && (
            <p>
              <b>{this.state.loadingText}</b>
            </p>
          )}
          <Component
            {...this.props}
            setLoaderState={this.setLoaderState}
            loadingText={this.state.loadingText}
            displayLoader={this.displayLoader}
            loaderInterval={this.interval}
          />
        </>
      );
    }
  }

  return WithLoader;
};

export default withLoader;
