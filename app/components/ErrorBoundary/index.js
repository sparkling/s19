import React from 'react';
import styled from 'styled-components';
import alert from './alert.png';

const AlertImage = styled.img `
  height: 20em;
`;
const StyledH3 = styled.h3`
  font-weight: bold;
  font-size: 2em;
`;
const Error = styled.div `
  text-align: center;
  margin-top: 3em;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  /* eslint-disable no-unused-vars */
  componentDidCatch(error, info) {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return (
        <Error>
          <AlertImage src={alert} />
          <StyledH3>Sorry — something has gone wrong</StyledH3>
        </Error>
      );
    }
    /* eslint-disable react/prop-types */
    return this.props.children;
  }
}

export default ErrorBoundary;
