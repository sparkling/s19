import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import {
  MAX_CHARACTER_COUNT,
} from 'constants';
import { maxLength } from './maxLength';
import Count from './Count';

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

  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }

  componentDidMount() {
    maxLength(this.contentEditable.htmlEl);
  }

  onEditFocusLocal = (() => {
    this.setState({ isEditing: true });
  });

  onEditBlurLocal = ((evt) => {
    this.setState({ isEditing: false });
    this.props.onEditBlur(evt, this.props.idea);
  });

  render() {
    return (
      <Container>
        <StyledBody
          data-max-length={MAX_CHARACTER_COUNT}
          html={this.props.idea.get('body') ? this.props.idea.get('body') : ''}
          disabled={false}
          onChange={(evt) => this.props.onUpdateBody(evt, this.props.idea.get('id'))}
          onBlur={this.onEditBlurLocal}
          onFocus={this.onEditFocusLocal}
          innerRef={(node) => { this.contentEditable = node; }}
        />
        { this.state.isEditing ? <Count text={this.props.idea.get('body')} /> : null }
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
