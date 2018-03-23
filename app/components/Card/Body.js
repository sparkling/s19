import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import { maxLength } from './maxLength';
import Count from './Count';
import {
  MAX_CHARACTER_COUNT,
} from './constants';

const StyledBody = styled(ContentEditable) `
  color: grey;
  padding: 1.5em;
  height: 240px;
  background-color: white;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    margin-left: -10px;
    margin-bottom: -10px;
  }
  &:focus {
    outline: none;
    border: none;
  };
`;
const Container = styled.div `
  position: relative;
`;

export class Body extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    maxLength(this.contentEditable.htmlEl);
  }

  render() {
    return (
      <Container>
        <StyledBody
          data-max-length={MAX_CHARACTER_COUNT}
          html={this.props.idea.get('body') ? this.props.idea.get('body') : ''}
          disabled={false}
          onChange={(evt) => this.props.onUpdateBody(evt, this.props.idea.get('id'))}
          onBlur={(evt) => this.props.onEditBlur(evt, this.props.idea)}
          innerRef={(node) => { this.contentEditable = node; }}
        />
        <Count text={this.props.idea.get('body')} />
      </Container>
    );
  }
}

Body.propTypes = {
  idea: PropTypes.object.isRequired,
  onUpdateBody: PropTypes.func.isRequired,
  onEditBlur: PropTypes.func.isRequired,
};

export default Body;
